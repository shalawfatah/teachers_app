import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { styles } from "@/styles/reklam_carousel";
import { Reklam } from "@/types/reklam";
import { LinearGradient } from "expo-linear-gradient";
import { useVideoPlayer, VideoView } from "expo-video";
import { SlideContent } from "./slide-content";

interface VideoSlideProps {
  reklam: Reklam;
  isActive: boolean;
  onPress: () => void;
  onEnd: () => void;
}

export function VideoSlide({
  reklam,
  isActive,
  onPress,
  onEnd,
}: VideoSlideProps) {
  // 1. UPDATED: Initialize the player with an object source to include headers
  const player = useVideoPlayer(
    {
      uri: reklam.video_hls_url,
      headers: {
        Referer: "https://teachers-dash.netlify.app",
      },
    },
    (player) => {
      player.loop = false;
    },
  );

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
      player.currentTime = 0;
    }
  }, [isActive, player]);

  useEffect(() => {
    return () => {
      player.release();
    };
  }, []);

  useEffect(() => {
    const subscription = player.addListener("playToEnd", () => {
      onEnd();
    });
    return () => {
      subscription.remove();
    };
  }, [player, onEnd]);

  return (
    <View style={styles.slideContainer}>
      <VideoView
        style={styles.webview}
        player={player}
        allowsPictureInPicture={false}
        contentFit="cover"
        nativeControls={false}
      />

      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onPress}
        disabled={reklam.link_type === "none"}
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.85)"]}
        locations={[0, 0.5, 1]}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />

      <SlideContent reklam={reklam} />
    </View>
  );
}
