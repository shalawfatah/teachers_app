import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { theme } from "@/constants/theme";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { LanguageProvider } from "@/contexts/LanguageContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Goran: require("@/assets/fonts/goran.ttf"),
    "NRT-Bold": require("@/assets/fonts/nrt-bd.ttf"),
  });

  const { loading } = useAuthGuard(fontsLoaded);

  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <LanguageProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(teacher)" />
          <Stack.Screen name="(student)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </LanguageProvider>
  );
}
