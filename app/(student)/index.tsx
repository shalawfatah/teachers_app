import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/home_styles";
import Loader from "@/components/Loader";
import { Student } from "@/types/profile";
import { ReklamCarousel } from "@/components/content/ReklamCarousel";

type TeacherStats = {
  students_count: number;
  courses_count: number;
  videos_count: number;
};

export default function StudentDashboard() {
  const [profile, setProfile] = useState<Student | null>(null);
  const [teacherStats, setTeacherStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile?.teachers?.id) {
      getTeacherStats(profile.teachers.id);
    }
  }, [profile]);

  const getProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("students")
          .select("*, teachers(*)")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTeacherStats = async (teacherId: string) => {
    try {
      setStatsLoading(true);
      const { data, error } = await supabase.rpc("get_teacher_stats", {
        teacher_uuid: teacherId,
      });

      if (error) throw error;
      setTeacherStats(data?.[0] || null);
    } catch (error) {
      console.error("Error fetching teacher stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Reklam Carousel - Full page auto-advancing slides */}
      {profile?.teachers?.id && (
        <ReklamCarousel teacherId={profile.teachers.id} />
      )}

      {/* Teacher Hero Section - Existing content 
      <TeacherHeroSection
        profile={profile}
        teacherStats={teacherStats}
        statsLoading={statsLoading}
      />

      {/* Rest of your content here */}
    </ScrollView>
  );
}
