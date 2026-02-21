import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/video_single_styles";

export default function VideoPlayer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await supabase
        .from("videos")
        .select("*, courses(title)")
        .eq("id", id)
        .single();
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

  const player = useVideoPlayer(
    video?.video_hls_url
      ? {
        uri: video.video_hls_url,
        headers: { Referer: "https://teachers-dash.netlify.app" },
      }
      : null,
    (p) => {
      p.play();
    },
  );

  if (!isDataReady) return null;

  return (
    <View style={styles.container}>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={video?.title || "Video"} />
      </Appbar.Header>

      <View style={styles.videoContainer}>
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
