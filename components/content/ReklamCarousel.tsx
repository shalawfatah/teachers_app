import { useState, useEffect, useRef, useCallback } from "react";
import { View, Linking } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import PagerView from "react-native-pager-view";
import { Reklam, ReklamCarouselProps } from "@/types/reklam";
import { styles } from "@/styles/reklam_carousel";
import ImageSlide from "./reklam-carousel/image-slide";
import { supabase } from "@/lib/supabase";
import VideoSlide from "./reklam-carousel/video-slide";
import { useRouter } from "expo-router";

export function ReklamCarousel({ teacherId }: ReklamCarouselProps) {
  const [reklams, setReklams] = useState<Reklam[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
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
    fetchReklams();
  }, [teacherId]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const current = reklams[currentPage];
    if (current && !current.video_hls_url && reklams.length > 1) {
      timerRef.current = setTimeout(() => {
        const next = (currentPage + 1) % reklams.length;
        pagerRef.current?.setPage(next);
      }, 5000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentPage, reklams]);

  const handleVideoEnd = useCallback(() => {
    setTimeout(() => {
      const next = (currentPage + 1) % reklams.length;
      pagerRef.current?.setPage(next);
    }, 150);
  }, [currentPage, reklams.length]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (reklams.length === 0) return null;

  const handlePress = async (reklam: Reklam) => {
    if (!reklam.link_target || reklam.link_type === "none") return;

    switch (reklam.link_type) {
      case "course":
        router.push(`/(student)/courses/${reklam.link_target}`);
        break;

      case "video":
        router.push(`/(student)/video/${reklam.link_target}`);
        break;

      case "document":
        if (reklam.link_target) {
          Linking.openURL(reklam.link_target);
        }
        break;

      case "external":
        try {
          await Linking.openURL(reklam.link_target);
        } catch (err) {
          console.error("Error opening external link:", err);
        }
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
        offscreenPageLimit={0}
      >
        {reklams.map((reklam, index) => (
          <View key={reklam.id} style={styles.page}>
            {reklam.video_hls_url ? (
              <VideoSlide
                reklam={reklam}
                isActive={currentPage === index}
                onPress={() => handlePress(reklam)}
                onEnd={handleVideoEnd}
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
