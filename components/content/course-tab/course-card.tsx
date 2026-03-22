import React from "react";
import {
  View,
  Pressable,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Course } from "@/types/courses";
import { CourseMenu } from "./course-menu";
import { style_vars } from "@/utils/style_vars";

interface CourseCardProps {
  course: Course;
  menuVisible: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const { width } = Dimensions.get("window");
// 3:4 Aspect Ratio calculation
const CARD_WIDTH = width / 2 - 24;
const CARD_HEIGHT = (CARD_WIDTH * 4) / 3;

export function CourseCard({
  course,
  menuVisible,
  onOpenMenu,
  onCloseMenu,
  onView,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <View style={bookStyles.container}>
      <Pressable onPress={onView} style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: course.thumbnail || "https://via.placeholder.com/300x400",
          }}
          style={bookStyles.coverImage}
          imageStyle={{ borderRadius: 16 }}
        >
          {/* 1. DARK GRADIENT (Ensures text is readable regardless of image) */}
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)"]}
            style={StyleSheet.absoluteFill}
          >
            {/* 2. TOP RIGHT MENU (Floating) */}
            <View style={bookStyles.menuContainer}>
              <CourseMenu
                visible={menuVisible}
                onOpen={onOpenMenu}
                onClose={onCloseMenu}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </View>

            {/* 3. CENTER GLASS CONTENT */}
            <View style={bookStyles.contentCenter}>
              <BlurView intensity={20} tint="dark" style={bookStyles.glassInfo}>
                <Text style={bookStyles.title} numberOfLines={2}>
                  {course.title}
                </Text>
                <View style={bookStyles.divider} />
                <Text style={bookStyles.description} numberOfLines={2}>
                  {course.description}
                </Text>
              </BlurView>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </View>
  );
}

const bookStyles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 8,
    borderRadius: 16,
    // Soft outer shadow for the "Book" pop
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  coverImage: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 16,
  },
  menuContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
  },
  contentCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  glassInfo: {
    width: "100%",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: style_vars.PRIMARY_FONT,
    textAlign: "center",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    width: "40%",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 6,
  },
  description: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
});
