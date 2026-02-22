import { useState, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export const useAuthGuard = (fontsLoaded: boolean) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(true);

  const segments = useSegments();
  const router = useRouter();

  const checkUserTables = async (userId: string) => {
    const [t, s] = await Promise.all([
      supabase.from("teachers").select("id").eq("id", userId).single(),
      supabase.from("students").select("id").eq("id", userId).single(),
    ]);
    return { isTeacher: !!t.data, isStudent: !!s.data };
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        if (session) {
          const roles = await checkUserTables(session.user.id);
          setIsTeacher(roles.isTeacher);
          setIsStudent(roles.isStudent);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      if (session) {
        const roles = await checkUserTables(session.user.id);
        setIsTeacher(roles.isTeacher);
        setIsStudent(roles.isStudent);
      } else {
        setIsTeacher(false);
        setIsStudent(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading || !fontsLoaded) return;

    const group = segments[0];
    const inAuthGroup = group === "(auth)";
    const inTeacherGroup = group === "(teacher)";
    const inStudentGroup = group === "(student)";

    if (!session) {
      if (!inAuthGroup) {
        router.replace("/(auth)/login");
      }
      return;
    }

    if (isTeacher || isStudent) {
      if (inAuthGroup) {
        if (isTeacher) {
          router.replace("/(teacher)");
        } else {
          router.replace("/(student)");
        }
      } else if (isTeacher && !inTeacherGroup) {
        router.replace("/(teacher)");
      } else if (!isTeacher && isStudent && !inStudentGroup) {
        router.replace("/(student)");
      }
    }
  }, [session, isTeacher, isStudent, loading, fontsLoaded, segments]);

  return { loading };
};
