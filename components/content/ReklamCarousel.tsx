import { useState, useEffect, useRef } from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import PagerView from "react-native-pager-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type Reklam = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  link_type: "course" | "video" | "external" | "none";
  link_target: string | null;
  background_color: string;
  text_color: string;
};

interface ReklamCarouselProps {
  teacherId: string;
}

export function ReklamCarousel({ teacherId }: ReklamCarouselProps) {
  const [reklams, setReklams] = useState<Reklam[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchReklams();
  }, [teacherId]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (reklams.length <= 1) return; // Don't auto-advance if only one slide

    startAutoAdvance();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [reklams.length, currentPage]);

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
    } catch (error) {
      console.error("Error fetching reklams:", error);
    } finally {
      setLoading(false);
    }
  };

  const startAutoAdvance = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCurrentPage((prev) => {
        const nextPage = prev + 1 >= reklams.length ? 0 : prev + 1;
        pagerRef.current?.setPage(nextPage);
        return nextPage;
      });
    }, 5000); // 5 seconds
  };

  const handlePageChange = (e: any) => {
    const newPage = e.nativeEvent.position;
    setCurrentPage(newPage);
    // Restart timer when user manually changes page
    startAutoAdvance();
  };

  const handleReklamPress = (reklam: Reklam) => {
    if (!reklam.link_target) return;

    switch (reklam.link_type) {
      case "course":
        router.push(`/(student)/courses/${reklam.link_target}`);
        break;
      case "video":
        router.push(`/video/${reklam.link_target}`);
        break;
      case "external":
        // Open external link (you might want to use Linking.openURL)
        console.log("Open external:", reklam.link_target);
        break;
      case "none":
      default:
        break;
    }
  };

  const goToPrevious = () => {
    const prevPage = currentPage - 1 < 0 ? reklams.length - 1 : currentPage - 1;
    pagerRef.current?.setPage(prevPage);
    setCurrentPage(prevPage);
  };

  const goToNext = () => {
    const nextPage = currentPage + 1 >= reklams.length ? 0 : currentPage + 1;
    pagerRef.current?.setPage(nextPage);
    setCurrentPage(nextPage);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (reklams.length === 0) {
    return null; // Don't show anything if no ads
  }

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={handlePageChange}
      >
        {reklams.map((reklam) => (
          <View key={reklam.id} style={styles.page}>
            <Pressable
              style={styles.slideContainer}
              onPress={() => handleReklamPress(reklam)}
              disabled={reklam.link_type === "none"}
            >
              <ImageBackground
                source={{
                  uri:
                    reklam.image_url ||
                    "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=1200",
                }}
                style={styles.background}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0.3)",
                    "rgba(0,0,0,0.6)",
                    "rgba(0,0,0,0.8)",
                  ]}
                  locations={[0, 0.5, 1]}
                  style={styles.gradient}
                >
                  {/* Content */}
                  <View style={styles.content}>
                    <Text variant="displaySmall" style={styles.title}>
                      {reklam.title}
                    </Text>
                    {reklam.description && (
                      <Text variant="titleMedium" style={styles.description}>
                        {reklam.description}
                      </Text>
                    )}

                    {/* Call to action */}
                    {reklam.link_type !== "none" && (
                      <View style={styles.ctaContainer}>
                        <View style={styles.ctaButton}>
                          <Text style={styles.ctaText}>
                            {reklam.link_type === "course" && "بینینی خول"}
                            {reklam.link_type === "video" && "سەیرکردنی ڤیدیۆ"}
                            {reklam.link_type === "external" && "کردنەوە"}
                          </Text>
                          <MaterialCommunityIcons
                            name="arrow-left"
                            size={20}
                            color="#fff"
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              </ImageBackground>
            </Pressable>
          </View>
        ))}
      </PagerView>

      {/* Navigation Arrows */}
      {reklams.length > 1 && (
        <>
          <TouchableOpacity
            style={[styles.arrow, styles.arrowLeft]}
            onPress={goToPrevious}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={32}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.arrow, styles.arrowRight]}
            onPress={goToNext}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color="#fff"
            />
          </TouchableOpacity>
        </>
      )}

      {/* Page Indicators */}
      {reklams.length > 1 && (
        <View style={styles.indicators}>
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

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT - 75, // Full screen height
    position: "relative",
  },
  loadingContainer: {
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  pager: {
    flex: 1,
  },
  page: {
    width: SCREEN_WIDTH,
  },
  slideContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
  },
  content: {
    gap: 16,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "NRT-Bold",
    textAlign: "right",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    color: "rgba(255, 255, 255, 0.95)",
    fontFamily: "Goran",
    textAlign: "right",
    lineHeight: 24,
  },
  ctaContainer: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Goran",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  arrowLeft: {
    right: 16,
  },
  arrowRight: {
    left: 16,
  },
  indicators: {
    position: "absolute",
    bottom: 24,
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
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  indicatorActive: {
    width: 24,
    backgroundColor: "#fff",
  },
});
