import { useState, useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  Linking,
  ImageBackground,
} from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { WebView } from "react-native-webview"; // Import WebView
import { LinearGradient } from "expo-linear-gradient";
import PagerView from "react-native-pager-view";
import BrushBackground from "./BrushBackground";
import { Reklam, ReklamCarouselProps } from "@/types/reklam";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// ─── Video Slide using WebView ──────────────────────────────────────────────

interface VideoSlideProps {
  reklam: Reklam;
  isActive: boolean;
  onPress: () => void;
}

function VideoSlide({ reklam, isActive, onPress }: VideoSlideProps) {
  // We use the same logic as your working VideoPlayer.tsx
  // Adding autoplay params to the URL if they aren't there
  const videoUri = reklam.video_url?.includes("?")
    ? `${reklam.video_url}&autoplay=true&muted=false`
    : `${reklam.video_url}?autoplay=true&muted=false`;

  return (
    <View style={styles.slideContainer}>
      {/* IMPORTANT: We only render the WebView when the slide is active.
         WebViews are heavy; rendering many at once will lag the carousel.
      */}
      {isActive ? (
        <WebView
          source={{ uri: videoUri }}
          style={styles.webview}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          scrollEnabled={false}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.centeredOverlay}>
              <ActivityIndicator color="white" />
            </View>
          )}
        />
      ) : (
        <View style={[styles.webview, { backgroundColor: "#000" }]} />
      )}

      {/* Transparent overlay so the user can still click the slide to navigate */}
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

// ─── Main Carousel ────────────────────────────────────────────────────────────

export function ReklamCarousel({ teacherId }: ReklamCarouselProps) {
  const [reklams, setReklams] = useState<Reklam[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReklams = async () => {
      try {
        const { data } = await (
          reklams.length === 0
            ? require("@/lib/supabase").supabase
            : {
              from: () => ({
                select: () => ({
                  eq: () => ({ eq: () => ({ order: () => data }) }),
                }),
              }),
            }
        )
          .from("reklam")
          .select("*")
          .eq("teacher_id", teacherId)
          .eq("is_active", true)
          .order("display_order", { ascending: true });
        setReklams(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReklams();
  }, [teacherId]);

  // Auto-advance for images only
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const current = reklams[currentPage];

    // If it's an image, set a 5-second timer
    if (current && !current.video_url && reklams.length > 1) {
      timerRef.current = setTimeout(() => {
        const next = (currentPage + 1) % reklams.length;
        pagerRef.current?.setPage(next);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentPage, reklams]);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  if (reklams.length === 0) return null;

  const handlePress = (reklam: Reklam) => {
    if (!reklam.link_target || reklam.link_type === "none") return;

    switch (reklam.link_type) {
      case "external":
        // Opens in system browser
        Linking.openURL(reklam.link_target);
        break;

      case "document":
        // Downloads/Opens the PDF/Doc directly via system browser/handler
        // This uses the file_url we saved in the form earlier
        Linking.openURL(reklam.link_target);
        break;

      case "video":
        // Navigates to your specific video player route
        router.push(`/video/${reklam.link_target}`);
        break;

      case "course":
        // Navigates to the course page
        router.push(`/(student)/courses/${reklam.link_target}`);
        break;

      default:
        console.warn("Unknown link type:", reklam.link_type);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {reklams.map((reklam, index) => (
          <View key={reklam.id} style={styles.page}>
            {reklam.video_url ? (
              <VideoSlide
                reklam={reklam}
                isActive={currentPage === index}
                onPress={() => handlePress(reklam)}
              />
            ) : (
              <ImageSlide reklam={reklam} onPress={() => handlePress(reklam)} />
            )}
          </View>
        ))}
      </PagerView>
    </View>
  );
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

function ImageSlide({
  reklam,
  onPress,
}: {
  reklam: Reklam;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.slideContainer} onPress={onPress}>
      <ImageBackground
        source={{ uri: reklam.image_url! }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={StyleSheet.absoluteFill}
      />
      <SlideContent reklam={reklam} />
    </Pressable>
  );
}

function SlideContent({ reklam }: { reklam: Reklam }) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{reklam.title}</Text>
      {reklam.description && (
        <View style={styles.descriptionWrapper}>
          <BrushBackground colors={["#FFFF00", "#737000"]} />
          <Text style={styles.descriptionText}>{reklam.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: SCREEN_HEIGHT - 75 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  pager: { flex: 1 },
  page: { flex: 1 },
  slideContainer: { flex: 1, backgroundColor: "#000" },
  webview: { flex: 1 },
  centeredOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
  },
  content: {
    position: "absolute",
    bottom: 80,
    left: 24,
    right: 24,
    alignItems: "flex-end",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "right",
  },
  descriptionWrapper: { marginTop: 10, padding: 10 },
  descriptionText: { color: "#000", textAlign: "right" },
});
