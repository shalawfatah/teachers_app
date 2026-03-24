import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Text } from "react-native-paper";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { style_vars } from "@/utils/style_vars";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;
const CARD_HEIGHT = (CARD_WIDTH * 4) / 3;

export const renderCourse = ({ item }: { item: any }) => {
  const hasThumbnail = item.thumbnail && item.thumbnail.trim().length > 0;

  return (
    <Link href={`/(student)/courses/${item.id}`} asChild>
      <Pressable style={bookStyles.container}>
        <ImageBackground
          source={{
            uri: hasThumbnail
              ? item.thumbnail
              : "https://via.placeholder.com/300x400",
          }}
          style={bookStyles.coverImage}
          imageStyle={{ borderRadius: 16 }}
        >
          {/* 1. OVERLAY GRADIENT */}
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.7)"]}
            style={StyleSheet.absoluteFill}
          >
            {/* 2. TOP BADGE (Grade) */}
            <View style={bookStyles.badgeWrapper}>
              <BlurView intensity={20} tint="light" style={bookStyles.chipBlur}>
                <Text style={bookStyles.chipText}>پۆلی {item.grade}</Text>
              </BlurView>
            </View>

            {/* 3. CENTERED GLASS CONTENT */}
            <View style={bookStyles.contentCenter}>
              <BlurView intensity={30} tint="dark" style={bookStyles.glassInfo}>
                <Text
                  variant="titleMedium"
                  style={bookStyles.title}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                <View style={bookStyles.divider} />

                <Text
                  variant="bodySmall"
                  style={bookStyles.description}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              </BlurView>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </Link>
  );
};

const bookStyles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 8,
    borderRadius: 16,
    backgroundColor: "#1a1a1a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  coverImage: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 16,
  },
  badgeWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  chipBlur: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  chipText: {
    color: "#FFF",
    fontSize: 10,
    fontFamily: style_vars.PRIMARY_FONT,
    fontWeight: "bold",
  },
  contentCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  glassInfo: {
    width: "100%",
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  title: {
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
    textAlign: "center",
    fontWeight: "800",
    lineHeight: 20,
    fontSize: 16,
  },
  divider: {
    height: 1.5,
    width: "30%",
    backgroundColor: "rgba(255,255,255,0.4)",
    marginVertical: 8,
    borderRadius: 1,
  },
  description: {
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 14,
    fontFamily: style_vars.PRIMARY_FONT,
  },
});
