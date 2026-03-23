import { style_vars } from "@/utils/style_vars";
import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Text, Appbar, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";
import { Video } from "@/types/videos";

const { width } = Dimensions.get("window");

function PlayerSection({ url }: { url: string }) {
  const player = useVideoPlayer(
    {
      uri: url,
      headers: { Referer: "https://teachers-dash.netlify.app" },
    },
    (p) => {
      p.play();
    },
  );

  return (
    <VideoView
      style={styles.nativePlayer}
      player={player}
      fullscreenOptions={{ enable: true }}
      nativeControls={true}
      contentFit="contain"
    />
  );
}

export default function VideoPlayer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await supabase
        .from("videos")
        .select("*, courses(title)")
        .eq("id", id)
        .single();
      if (data) setVideo(data);
    };
    fetchVideo();
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };
  }, [id]);

  return (
    <View style={styles.container}>
      {/* THE FIX: Absolute fill ensures the gradient covers the background layer completely */}
      <LinearGradient
        colors={gradient_colors}
        style={StyleSheet.absoluteFill}
      />

      <BackgroundShapes />
      <Appbar.Header elevated={false} style={styles.header}>
        <Appbar.BackAction onPress={() => router.back()} color="#FFF" />
        <Appbar.Content
          title={video?.title || "Video"}
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <View style={styles.videoContainer}>
        {video?.video_hls_url ? (
          <PlayerSection url={video.video_hls_url} />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              color={style_vars.PRIMARY_WHITE_BUTTON}
              size="large"
            />
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text variant="headlineSmall" style={styles.videoTitle}>
          {video?.title}
        </Text>
        <Text variant="titleMedium" style={styles.courseTitle}>
          {video?.courses?.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Acts as a fallback for the video area
  },
  header: {
    backgroundColor: "transparent",
    elevation: 0,
  },
  headerTitle: {
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
  },
  videoContainer: {
    width: width,
    height: width * (9 / 16),
    backgroundColor: "#000",
  },
  nativePlayer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    padding: 20,
  },
  videoTitle: {
    fontWeight: "800",
    color: "#FFF",
  },
  courseTitle: {
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 4,
  },
});
