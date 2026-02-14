import { Stack, useRouter, useSegments, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  // Helper function to check user tables
  const checkUserTables = async (userId: string) => {
    // Check both tables in parallel
    const [teacherResult, studentResult] = await Promise.all([
      supabase.from("teachers").select("id").eq("id", userId).single(),
      supabase.from("students").select("id").eq("id", userId).single(),
    ]);

    return {
      isTeacher: !!teacherResult.data,
      isStudent: !!studentResult.data,
    };
  };

  useEffect(() => {
    // Get initial session and check tables
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("Session loaded:", session ? "exists" : "null");

        setSession(session);

        if (session) {
          const { isTeacher, isStudent } = await checkUserTables(
            session.user.id,
          );
          setIsTeacher(isTeacher);
          setIsStudent(isStudent);
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session) {
        const { isTeacher, isStudent } = await checkUserTables(session.user.id);
        setIsTeacher(isTeacher);
        setIsStudent(isStudent);
      } else {
        setIsTeacher(false);
        setIsStudent(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTeacherGroup = segments[0] === "(teacher)";
    const inStudentGroup = segments[0] === "(student)";

    if (!session && !inAuthGroup) {
      // Not authenticated - redirect to login
      router.replace("/(auth)/login");
    } else if (session && (isTeacher || isStudent) && inAuthGroup) {
      // Authenticated - redirect based on role (teachers take priority)
      if (isTeacher) {
        router.replace("/(teacher)");
      } else if (isStudent) {
        router.replace("/(student)");
      }
    } else if (session && (isTeacher || isStudent)) {
      // Ensure user is in correct role group (teachers take priority)
      if (isTeacher && !inTeacherGroup) {
        router.replace("/(teacher)");
      } else if (!isTeacher && isStudent && !inStudentGroup) {
        router.replace("/(student)");
      }
    }

    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [session, isTeacher, isStudent, loading]);

  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
        <Stack.Screen name="(student)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
