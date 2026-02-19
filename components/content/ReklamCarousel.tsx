import { useState, useEffect, useRef, useCallback } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import PagerView from "react-native-pager-view";
import { Reklam, ReklamCarouselProps } from "@/types/reklam";
import { styles } from "@/styles/reklam_carousel";
import { VideoSlide } from "./reklam-carousel/video-slide";
import ImageSlide from "./reklam-carousel/image-slide";
import { supabase } from "@/lib/supabase";

export function ReklamCarousel({ teacherId }: ReklamCarouselProps) {
  const [reklams, setReklams] = useState<Reklam[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        offscreenPageLimit={1} 
      >
        {reklams.map((reklam, index) => (
          <View key={reklam.id} style={styles.page}>
            {reklam.video_hls_url ? (
              <VideoSlide
                reklam={reklam}
                isActive={currentPage === index}
                onPress={() => {/* keep your handlePress logic here */}}
                onEnd={handleVideoEnd}
              />
            ) : (
              <ImageSlide reklam={reklam} onPress={() => {/* keep your handlePress logic here */}} />
            )}
          </View>
        ))}
      </PagerView>
    </View>
  );
}
