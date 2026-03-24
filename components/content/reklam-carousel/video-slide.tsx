import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video"; // New imports
import { styles } from "@/styles/reklam_carousel";
import { Reklam } from "@/types/reklam";
import { LinearGradient } from "expo-linear-gradient";
import { SlideContent } from "./slide-content";

interface VideoSlideProps {
  reklam: Reklam;
  isActive: boolean;
  onPress: () => void;
  onEnd: () => void;
}

export default function VideoSlide({
  reklam,
  isActive,
  onPress,
  onEnd,
}: VideoSlideProps) {
  // 1. Initialize the player
  const player = useVideoPlayer(
    {
      uri: reklam.video_hls_url!,
      headers: { Referer: "https://teachers-dash.netlify.app" },
    },
    (p) => {
      p.loop = false;
      p.muted = false;
      // Autoplay logic handled by the isActive effect below
    },
  );

  // 2. Handle the "isActive" logic (Play/Pause/Reset)
  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
      player.seekBy(0); // Reset to start when not active
    }
  }, [isActive, player]);

  // 3. Handle the "onEnd" event
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
      {/* 4. Use VideoView instead of Video */}
      <VideoView
        player={player}
        style={styles.webview}
        contentFit="cover"
        nativeControls={false} // Keeps it clean for a carousel
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
