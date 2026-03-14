import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function TeacherLayout() {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6200ee",
      }}
    >
      {/* Primary Tab Navigation */}
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
        name="content/index"
        options={{
          title: text.course_video,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="video-box"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="students/index"
        options={{
          title: text.students,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={size}
              color={color}
            />
          ),
        }}
      />
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

      {/* Secondary / Detail Screens 
          'href: null' hides them from the bottom bar while allowing navigation.
      */}

      {/* Student Detail Routes */}
      <Tabs.Screen name="students/view/[id]" options={{ href: null }} />
      <Tabs.Screen name="students/edit/[id]" options={{ href: null }} />
      <Tabs.Screen name="video/[id]" options={{ href: null }} />

      {/* Course Detail Routes (Matches (course) folder in your tree) */}
      <Tabs.Screen name="content/(course)/view/[id]" options={{ href: null }} />
      <Tabs.Screen name="content/(course)/edit/[id]" options={{ href: null }} />

      {/* NOTE: Removed content/(video) entries because that folder 
          does not exist in your file system according to your tree. 
      */}
    </Tabs>
  );
}
