import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
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
  const videoRef = useRef<Video>(null);
  const isMounted = useRef(true);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!isMounted.current || !videoRef.current) return;
      try {
        if (isActive) {
          await videoRef.current.playAsync();
        } else {
          await videoRef.current.pauseAsync();
          await videoRef.current.setPositionAsync(0);
        }
      } catch (_) {
        // swallow errors during teardown
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isActive]);

  const handlePlaybackStatus = (status: AVPlaybackStatus) => {
    if (!isMounted.current) return;
    if (status.isLoaded && status.didJustFinish) {
      setTimeout(() => {
        if (!isMounted.current) return;
        onEndRef.current();
      }, 150);
    }
  };

  return (
    <View style={styles.slideContainer}>
      <Video
        ref={videoRef}
        source={{
          uri: reklam.video_hls_url!,
          headers: { Referer: "https://teachers-dash.netlify.app" },
        }}
        style={styles.webview}
        resizeMode={ResizeMode.COVER}
        shouldPlay={false} // we control play manually
        isLooping={false}
        isMuted={false}
        useNativeControls={false}
        onPlaybackStatusUpdate={handlePlaybackStatus}
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
