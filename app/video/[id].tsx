import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { Text, IconButton, Appbar } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { supabase } from "@/lib/supabase";

const { width } = Dimensions.get("window");

export default function VideoPlayer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchVideoData();
    }

    return () => {
      // Reset orientation when leaving
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, [id]);

  const fetchVideoData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("videos")
        .select("*, courses(title)")
        .eq("id", id)
        .single();

      if (error) throw error;

      console.log("Video data:", data);
      console.log("Video link:", data.link);

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
        <Appbar.Header>
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
        <Appbar.Header>
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
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={video.title} titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: video.link }}
          style={styles.webview}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#6200ee" />
            </View>
          )}
        />
      </View>

      <View style={styles.infoSection}>
        <Text variant="titleLarge" style={styles.videoTitle}>
          {video.title}
        </Text>
        {video.courses?.title && (
          <Text variant="bodyMedium" style={styles.courseTitle}>
            {video.courses.title}
          </Text>
        )}
        {video.free && (
          <View style={styles.freeTag}>
            <Text style={styles.freeTagText}>FREE</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  videoContainer: {
    width: width,
    height: width * (9 / 16), // 16:9 aspect ratio
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  infoSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  videoTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  courseTitle: {
    color: "#666",
    marginBottom: 8,
  },
  freeTag: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  freeTagText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    marginHorizontal: 32,
  },
  headerTitle: {
    fontSize: 16,
  },
});
