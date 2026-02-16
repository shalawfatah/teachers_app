import { Stack, useRouter, useSegments, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PaperProvider,
  MD3LightTheme,
  configureFonts,
} from "react-native-paper";
import { useFonts } from "expo-font"; // Add this
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 1. Load your local fonts
  const [fontsLoaded, fontError] = useFonts({
    Goran: require("@/assets/fonts/goran.ttf"),
    "NRT-Bold": require("@/assets/fonts/nrt-bd.ttf"),
  });

  const [session, setSession] = useState<Session | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  // 2. Configure React Native Paper to use Goran by default
  const fontConfig = {
    fontFamily: "Goran",
  };

  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig }),
  };

  // Auth logic stays the same...
  const checkUserTables = async (userId: string) => {
    const [teacherResult, studentResult] = await Promise.all([
      supabase.from("teachers").select("id").eq("id", userId).single(),
      supabase.from("students").select("id").eq("id", userId).single(),
    ]);
    return { isTeacher: !!teacherResult.data, isStudent: !!studentResult.data };
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
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
    // 3. Only hide SplashScreen when BOTH Auth and Fonts are ready
    if (loading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTeacherGroup = segments[0] === "(teacher)";
    const inStudentGroup = segments[0] === "(student)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (session && (isTeacher || isStudent) && inAuthGroup) {
      if (isTeacher) router.replace("/(teacher)");
      else if (isStudent) router.replace("/(student)");
    } else if (session && (isTeacher || isStudent)) {
      if (isTeacher && !inTeacherGroup) router.replace("/(teacher)");
      else if (!isTeacher && isStudent && !inStudentGroup)
        router.replace("/(student)");
    }

    SplashScreen.hideAsync();
  }, [session, isTeacher, isStudent, loading, fontsLoaded]); // Add fontsLoaded here

  // 4. Handle font loading errors
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
        <Stack.Screen name="(student)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
