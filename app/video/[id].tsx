import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import { supabase } from "@/lib/supabase";

const { width } = Dimensions.get("window");

export default function VideoPlayer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);
  const [isDataReady, setIsDataReady] = useState(false);

  // 1. Fetch data first
  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await supabase.from("videos").select("*, courses(title)").eq("id", id).single();
      if (data) {
        setVideo(data);
        setIsDataReady(true);
      }
    };
    fetchVideo();
    
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    };
  }, [id]);

  // 2. Only initialize the player if we have the URL
  // This prevents the player from getting "stuck" in a null-loading state
  const player = useVideoPlayer(video?.video_hls_url ? {
    uri: video.video_hls_url,
    headers: { Referer: "https://teachers-dash.netlify.app" },
  } : null, (p) => {
    p.play();
  });

  if (!isDataReady) return null; // Or a simple full-screen activity indicator

  return (
    <View style={styles.container}>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={video?.title || "Video"} />
      </Appbar.Header>

      <View style={styles.videoContainer}>
        {/* KEY REASON FOR NO CONTROLS: 
           If the player is initialized with null, sometimes nativeControls don't attach.
           By using the 'key', we force a fresh native view once the URL is ready.
        */}
        <VideoView
          key={video?.video_hls_url} 
          style={styles.nativePlayer}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls={true} // This MUST be true
          contentFit="contain"
        />
      </View>

      <View style={styles.infoSection}>
        <Text variant="headlineSmall" style={styles.videoTitle}>{video?.title}</Text>
        <Text variant="titleMedium" style={styles.courseTitle}>{video?.courses?.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  videoContainer: {
    width: width,
    height: width * (9 / 16),
    backgroundColor: "#000",
  },
  nativePlayer: { flex: 1 },
  infoSection: { padding: 20 },
  videoTitle: { fontWeight: "800" },
  courseTitle: { color: "#666" },
});
