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
  // Initialize the player with the HLS URL
  const player = useVideoPlayer(reklam.video_hls_url, (player) => {
    player.loop = false;
  });

  // Handle Play/Pause based on whether the slide is active
  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
      // Use the currentTime property to reset the video position
      player.currentTime = 0;
    }
  }, [isActive, player]); // Listen for the video completion

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
        style={styles.webview} // Reusing your existing webview style for sizing
        player={player}
        allowsPictureInPicture={false}
        contentFit="cover"
        nativeControls={false} // Keeping it clean for a carousel
      />

      {/* Overlay Pressable: We place this over the video so the user 
          can click the "ad" even if the video is playing.
      */}
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
