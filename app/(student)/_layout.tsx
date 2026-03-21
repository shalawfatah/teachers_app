import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { BlurView } from "expo-blur"; // Import this
import { Platform, StyleSheet } from "react-native";

export default function StudentLayout() {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF8C00",
        tabBarInactiveTintColor: "#FFFFFF", // Vivid white as requested
        tabBarStyle: {
          position: "absolute", // Required for content to show behind the bar
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 90 : 70,
          backgroundColor: "transparent", // Transparent so BlurView shows through
        },
        // This is where the magic happens
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={80} // Adjust this (0-100) for more or less blur
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarLabelStyle: {
          fontFamily: "NRT-Bold",
          fontSize: 12,
          marginBottom: Platform.OS === "ios" ? 0 : 10,
        },
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

      <Tabs.Screen
        name="courses/[id]"
        options={{
          href: null,
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
