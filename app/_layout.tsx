import { Stack, useRouter, useSegments, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PaperProvider, ActivityIndicator } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Get initial session and role
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        setUserRole(data?.role || null);
      }

      setLoading(false);
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        setUserRole(data?.role || null);
      } else {
        setUserRole(null);
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
    } else if (session && userRole && inAuthGroup) {
      // Authenticated - redirect based on role
      if (userRole === "teacher") {
        router.replace("/(teacher)");
      } else {
        router.replace("/(student)");
      }
    } else if (session && userRole) {
      // Ensure user is in correct role group
      if (userRole === "teacher" && !inTeacherGroup) {
        router.replace("/(teacher)");
      } else if (userRole === "student" && !inStudentGroup) {
        router.replace("/(student)");
      }
    }

    SplashScreen.hideAsync();
  }, [session, userRole, segments, loading]);

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
