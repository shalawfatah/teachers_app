import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Teacher } from "@/types/profile";
import { TeacherStats } from "@/types/teacher";

export default function useTeacherAccount() {
  const [profile, setProfile] = useState<Teacher | null>(null);
  const [stats, setStats] = useState<TeacherStats>();
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
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
  };

  const getStats = async () => {
    if (!profile?.id) return;
    const { data, error } = await supabase.rpc("get_teacher_stats", {
      teacher_uuid: profile.id,
    });
    if (!error && data) setStats(data[0]);
  };

  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    getStats();
  }, [profile]);

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  return { profile, stats, loading, handleSignOut, refreshProfile: getProfile };
}
