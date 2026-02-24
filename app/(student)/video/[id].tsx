import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, Appbar, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/video_single_styles";

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
      allowsFullscreen
      allowsPictureInPicture
      nativeControls={true}
      contentFit="contain"
    />
  );
}

export default function VideoPlayer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);

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
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={video?.title || "Video"} />
      </Appbar.Header>

      <View style={styles.videoContainer}>
        {video?.video_hls_url ? (
          <PlayerSection url={video.video_hls_url} />
        ) : (
          <View style={styles.nativePlayer}>
            <ActivityIndicator />
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
