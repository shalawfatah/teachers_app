import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SlideContent } from "./slide-content";
import { Reklam } from "@/types/reklam";

export default function ImageSlide({
  reklam,
  onPress,
}: {
  reklam: Reklam;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={slideStyles.container}
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
      >
        {/* Subtle vignette gradient to catch text at the bottom */}
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
          style={StyleSheet.absoluteFill}
        />

        <SlideContent reklam={reklam} />
      </ImageBackground>
    </Pressable>
  );
}

const slideStyles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden", // Clips the image to the corners
    backgroundColor: "#1a1a1a",
  },
});
