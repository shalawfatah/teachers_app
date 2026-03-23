import { style_vars } from "@/utils/style_vars";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { BlurView } from "expo-blur"; // Import this
import { StyleSheet } from "react-native";

export default function StudentLayout() {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: style_vars.PRIMARY_WHITE_BUTTON,
        tabBarInactiveTintColor: style_vars.INACTIVE_BACKGROUND,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          bottom: 25,
          marginRight: "4%",
          marginLeft: "4%",
          height: 70,
          borderRadius: 24,
          backgroundColor: "transparent",
          paddingBottom: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        },
        tabBarItemStyle: {
          marginHorizontal: 5,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={80}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 24,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.15)",
            }}
          />
        ),
        tabBarLabelStyle: {
          fontFamily: style_vars.PRIMARY_FONT,
          fontSize: 12, // Dropped to 10 for better fit in a narrower bar
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 5, // Pushes icons down slightly to center vertically
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
