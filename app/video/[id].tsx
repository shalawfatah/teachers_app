import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { Text, IconButton, Appbar } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import { supabase } from "@/lib/supabase";

const { width } = Dimensions.get("window");

export default function VideoPlayer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the player with a null source initially
  const player = useVideoPlayer(video?.video_hls_url || null, (player) => {
    player.loop = false;
    player.play(); // Auto-play when loaded
  });

  useEffect(() => {
    if (id) {
      fetchVideoData();
    }

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };
  }, [id]);

  // Update player source when video data is fetched
  useEffect(() => {
    if (video?.video_hls_url) {
      player.replace({
        uri: video.video_hls_url,
        headers: {
          // Use the domain whitelisted in your Bunny.net dashboard
          Referer: "https://teachers-dash.netlify.app",
        },
      });
    }
  }, [video, player]);

  useEffect(() => {
    return () => {
      player.release();
    };
  }, []);

  const fetchVideoData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("videos")
        .select("*, courses(title)")
        .eq("id", id)
        .single();

      if (error) throw error;
      setVideo(data);
    } catch (err) {
      console.error("Error fetching video:", err);
      setError("Failed to load video");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Loading..." />
        </Appbar.Header>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      </View>
    );
  }

  if (error || !video) {
    return (
      <View style={styles.container}>
        <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Error" />
        </Appbar.Header>
        <View style={styles.centered}>
          <Text variant="bodyLarge" style={styles.errorText}>
            {error || "Video not found"}
          </Text>
          <IconButton
            icon="refresh"
            size={32}
            onPress={fetchVideoData}
            style={{ marginTop: 16 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={video.title} titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <View style={styles.videoContainer}>
        <VideoView
          style={styles.nativePlayer}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="contain"
          nativeControls={true} // Full playback controls for the lesson
        />

        {/* Native Loading Indicator */}
        {player.status === "loading" && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text variant="headlineSmall" style={styles.videoTitle}>
          {video.title}
        </Text>
        {video.courses?.title && (
          <Text variant="titleMedium" style={styles.courseTitle}>
            {video.courses.title}
          </Text>
        )}
        {video.free && (
          <View style={styles.freeTag}>
            <Text style={styles.freeTagText}>FREE LESSON</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    width: width,
    height: width * (9 / 16),
    backgroundColor: "#000",
  },
  nativePlayer: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  infoSection: {
    flex: 1,
    padding: 20,
  },
  videoTitle: {
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  courseTitle: {
    color: "#666",
    marginBottom: 12,
  },
  freeTag: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  freeTagText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    marginHorizontal: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
