import { styles } from "@/styles/reklam_carousel";
import { Reklam } from "@/types/reklam";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SlideContent } from "./slide-content";

export default function ImageSlide({
  reklam,
  onPress,
}: {
  reklam: Reklam;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.slideContainer}
      onPress={onPress}
      disabled={reklam.link_type === "none"}
    >
      <ImageBackground
        source={{
          uri:
            reklam.image_url ||
            "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=1200",
        }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Bottom gradient - 33% only */}
      <LinearGradient
        colors={["transparent", "transparent", "rgba(0,0,0,0.85)"]}
        locations={[0, 0.66, 1]}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />

      <SlideContent reklam={reklam} />
    </Pressable>
  );
}
