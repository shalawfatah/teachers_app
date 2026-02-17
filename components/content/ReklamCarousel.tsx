import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import PagerView from "react-native-pager-view";
import { VideoView, useVideoPlayer } from "expo-video";
import BrushBackground from "./BrushBackground";
import { Reklam, ReklamCarouselProps } from "@/types/reklam";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BUNNY_LIBRARY_ID = process.env.EXPO_PUBLIC_BUNNY_LIBRARY_ID;
const BUNNY_CDN_HOSTNAME = process.env.EXPO_PUBLIC_BUNNY_CDN_HOSTNAME;

function getBunnyHlsUrl(bunnyId: string): string {
  if (BUNNY_CDN_HOSTNAME) {
    return `https://${BUNNY_CDN_HOSTNAME}/${bunnyId}/playlist.m3u8`;
  }
  return `https://vz-${BUNNY_LIBRARY_ID}.b-cdn.net/${bunnyId}/playlist.m3u8`;
}

// ─── CTA label per link type ─────────────────────────────────────────────────

function getCtaLabel(linkType: string): string {
  switch (linkType) {
    case "course":
      return "بینینی خول";
    case "video":
      return "سەیرکردنی ڤیدیۆ";
    case "document":
      return "داگرتن";
    case "external":
      return "کردنەوە";
    default:
      return "";
  }
}

// ─── Single video slide ───────────────────────────────────────────────────────
// Isolated component so useVideoPlayer is always called with a stable URL.

interface VideoSlideProps {
  reklam: Reklam;
  isActive: boolean;
  onEnd: () => void;
  onPress: () => void;
}

function VideoSlide({ reklam, isActive, onEnd, onPress }: VideoSlideProps) {
  const hlsUrl = getBunnyHlsUrl(reklam.video_bunny_id!);

  const player = useVideoPlayer(hlsUrl, (p) => {
    p.loop = false;
    p.muted = false;
  });

  // Play/pause based on whether this slide is active
  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
      player.currentTime = 0;
    }
  }, [isActive]);

  // Fire onEnd when video finishes
  useEffect(() => {
    const sub = player.addListener("playingChange", (isPlaying) => {
      // When it stops playing and currentTime is near duration → finished
      if (
        !isPlaying &&
        player.duration &&
        player.currentTime >= player.duration - 0.5
      ) {
        onEnd();
      }
    });
    return () => sub.remove();
  }, [player, onEnd]);

  return (
    <Pressable
      style={styles.slideContainer}
      onPress={onPress}
      disabled={reklam.link_type === "none"}
    >
      {/* Video fills the slide */}
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Bottom tint — only bottom 33% */}
      <LinearGradient
        colors={["transparent", "transparent", "rgba(0,0,0,0.85)"]}
        locations={[0, 0.66, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <SlideContent reklam={reklam} />
    </Pressable>
  );
}

// ─── Single image slide ───────────────────────────────────────────────────────

interface ImageSlideProps {
  reklam: Reklam;
  onPress: () => void;
}

function ImageSlide({ reklam, onPress }: ImageSlideProps) {
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

      {/* Bottom tint — only bottom 33% */}
      <LinearGradient
        colors={["transparent", "transparent", "rgba(0,0,0,0.85)"]}
        locations={[0, 0.66, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <SlideContent reklam={reklam} />
    </Pressable>
  );
}

// ─── Shared slide content (title, description, CTA) ─────────────────────────

function SlideContent({ reklam }: { reklam: Reklam }) {
  const ctaLabel = getCtaLabel(reklam.link_type);

  return (
    <View style={styles.content}>
      <Text variant="displaySmall" style={styles.title}>
        {reklam.title}
      </Text>

      {reklam.description && (
        <View style={styles.descriptionWrapper}>
          <BrushBackground colors={["#FFFF00", "#737000"]} />
          <Text variant="titleMedium" style={styles.descriptionText}>
            {reklam.description}
          </Text>
        </View>
      )}

      {reklam.link_type !== "none" && ctaLabel && (
        <View style={styles.ctaContainer}>
          <View style={styles.ctaButton}>
            <Text style={styles.ctaText}>{ctaLabel}</Text>
          </View>
        </View>
      )}
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
    fetchReklams();
    return () => clearTimer();
  }, [teacherId]);

  const fetchReklams = async () => {
    try {
      const { data, error } = await supabase
        .from("reklam")
        .select("*")
        .eq("teacher_id", teacherId)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setReklams(data || []);
    } catch (err) {
      console.error("Error fetching reklams:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Navigation ──────────────────────────────────────────────────────────────

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const goToNext = useCallback(() => {
    setCurrentPage((prev) => {
      const next = prev + 1 >= reklams.length ? 0 : prev + 1;
      pagerRef.current?.setPage(next);
      return next;
    });
  }, [reklams.length]);

  // Start 5-second timer for IMAGE slides only
  const startImageTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 5000);
  }, [goToNext]);

  // When page changes, start timer only if it's an image slide
  useEffect(() => {
    if (reklams.length <= 1) return;
    const current = reklams[currentPage];
    if (current && !current.video_bunny_id) {
      // Image slide → start 5-second timer
      startImageTimer();
    } else {
      // Video slide → timer handled by onVideoEnd
      clearTimer();
    }
    return () => clearTimer();
  }, [currentPage, reklams]);

  const handlePageChange = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  // Called when a video finishes playing
  const handleVideoEnd = useCallback(() => {
    goToNext();
  }, [goToNext]);

  // ── Link handling ───────────────────────────────────────────────────────────

  const handlePress = useCallback(
    (reklam: Reklam) => {
      if (!reklam.link_target || reklam.link_type === "none") return;

      switch (reklam.link_type) {
        case "course":
          router.push(`/(student)/courses/${reklam.link_target}`);
          break;
        case "video":
          router.push(`/video/${reklam.link_target}`);
          break;
        case "document":
          // Fetch document URL from Supabase then open
          fetchAndOpenDocument(reklam.link_target);
          break;
        case "external":
          Linking.openURL(reklam.link_target).catch(console.error);
          break;
      }
    },
    [router],
  );

  const fetchAndOpenDocument = async (documentId: string) => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("file_url")
        .eq("id", documentId)
        .single();
      if (error) throw error;
      if (data?.file_url) {
        await Linking.openURL(data.file_url);
      }
    } catch (err) {
      console.error("Error opening document:", err);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (reklams.length === 0) return null;

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={handlePageChange}
        scrollEnabled={true}
      >
        {reklams.map((reklam, index) => (
          <View key={reklam.id} style={styles.page}>
            {reklam.video_bunny_id ? (
              <VideoSlide
                reklam={reklam}
                isActive={currentPage === index}
                onEnd={handleVideoEnd}
                onPress={() => handlePress(reklam)}
              />
            ) : (
              <ImageSlide reklam={reklam} onPress={() => handlePress(reklam)} />
            )}
          </View>
        ))}
      </PagerView>

      {/* Dot indicators only */}
      {reklams.length > 1 && (
        <View style={styles.indicators} pointerEvents="none">
          {reklams.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentPage === index && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT - 75,
    position: "relative",
  },
  loadingContainer: {
    height: SCREEN_HEIGHT - 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
  },
  // Content sits at the bottom
  content: {
    position: "absolute",
    bottom: 60, // above the indicators
    left: 24,
    right: 24,
    gap: 12,
    alignItems: "flex-end",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "NRT-Bold",
    textAlign: "right",
  },
  descriptionWrapper: {
    alignSelf: "flex-end",
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: "85%",
    overflow: "visible",
  },
  descriptionText: {
    color: "black",
    fontFamily: "Goran",
    textAlign: "right",
    lineHeight: 24,
    zIndex: 1,
  },
  ctaContainer: {
    alignItems: "flex-end",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Goran",
  },
  indicators: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  indicatorActive: {
    width: 24,
    backgroundColor: "#fff",
  },
});
