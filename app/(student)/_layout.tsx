import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function StudentLayout() {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6200ee",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: text.home,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* 1. This handles the 'courses' folder (the list) */}
      <Tabs.Screen
        name="courses/index"
        options={{
          title: text.course_video,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 2. HIDE THE DETAIL SCREEN FROM THE TAB BAR */}
      <Tabs.Screen
        name="courses/[id]"
        options={{
          href: null, // This removes it from the bottom bar entirely
        }}
      />

      <Tabs.Screen name="video/[id]" options={{ href: null }} />
      <Tabs.Screen
        name="account"
        options={{
          title: text.account,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
