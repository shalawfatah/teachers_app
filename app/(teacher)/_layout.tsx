import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function TeacherLayout() {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF8C00",
        tabBarInactiveTintColor: "#FFFFFF",
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
          // Shadow for depth
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
          fontFamily: "NRT-Bold",
          fontSize: 10,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 5,
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

      {/* Hidden Routes */}
      <Tabs.Screen name="students/view/[id]" options={{ href: null }} />
      <Tabs.Screen name="students/edit/[id]" options={{ href: null }} />
      <Tabs.Screen name="video/[id]" options={{ href: null }} />
      <Tabs.Screen name="content/(course)/view/[id]" options={{ href: null }} />
      <Tabs.Screen name="content/(course)/edit/[id]" options={{ href: null }} />
    </Tabs>
  );
}
