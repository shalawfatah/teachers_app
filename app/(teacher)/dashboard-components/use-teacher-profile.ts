import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Teacher } from "@/types/profile";
import { TeacherStats } from "@/types/teacher";

export function useTeacherProfile() {
  const [profile, setProfile] = useState<Teacher | null>(null);
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile?.id) {
      getStats();
    }

  }, [profile?.id]);

  const getProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("teachers")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = async () => {
    try {
      const { data, error } = await supabase.rpc("get_teacher_stats", {
        teacher_uuid: profile?.id,
      });
      if (error) throw error;
      setStats(data?.[0] || null);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const refresh = () => {
    getProfile();
  };

  return { profile, stats, loading, refresh, handleSignOut };
}
