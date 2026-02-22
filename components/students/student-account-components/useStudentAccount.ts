import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Student } from "@/types/profile";

export default function useStudentAccount() {
  const [profile, setProfile] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("students")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  return { profile, loading, handleSignOut, refreshProfile: getProfile };
}
