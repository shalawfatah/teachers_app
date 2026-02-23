import React, { useEffect, useMemo } from "react";
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

export default function VideoSlide({
  reklam,
  isActive,
  onPress,
  onEnd,
}: VideoSlideProps) {
  // 1. Memoize the source so the player doesn't reset on every render
  const source = useMemo(() => {
    if (!reklam.video_hls_url) return null;
    return {
      uri: reklam.video_hls_url,
      headers: {
        Referer: "https://teachers-dash.netlify.app",
      },
    };
  }, [reklam.video_hls_url]);

  // 2. Initialize the player
  const player = useVideoPlayer(source, (p) => {
    p.loop = false;
    // Muting by default often helps auto-play stability in simulators
    p.muted = false;
  });

  // 3. Handle Play/Pause logic based on carousel focus
  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
      // Only seek to 0 if the video has loaded enough to have a duration
      // This prevents the 'pointer authentication' crash on track metadata
      if (player.status === "readyToPlay") {
        player.currentTime = 0;
      }
    }
  }, [isActive, player]);

  // 4. Handle the "Video Ended" event
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
        nativeControls={false} // Keeps it clean for a carousel
      />

      {/* Transparent overlay for the link click */}
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
