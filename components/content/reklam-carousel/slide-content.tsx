import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { BlurView } from "expo-blur";
import { supabase } from "@/lib/supabase"; // Import supabase
import { Reklam } from "@/types/reklam";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { style_vars } from "@/utils/style_vars";

export function SlideContent({ reklam }: { reklam: Reklam }) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkAuth();
  }, []);

  const getCtaLabel = () => {
    switch (reklam.link_type) {
      case "course":
        return text.view;
      case "video":
        return text.view_video;
      case "document":
        // Logic: Only return the label if the user is logged in
        return isLoggedIn ? text.download : null;
      case "external":
        return text.open;
      default:
        return "";
    }
  };

  const ctaLabel = getCtaLabel();

  return (
    <View
      style={[
        contentStyles.overlay,
        { alignItems: isRTL ? "flex-end" : "flex-start" },
      ]}
    >
      <Text
        style={[contentStyles.title, { textAlign: isRTL ? "right" : "left" }]}
      >
        {reklam.title}
      </Text>

      {reklam.description && (
        <BlurView
          intensity={30}
          tint="light"
          style={contentStyles.descriptionGlass}
        >
          <Text style={contentStyles.descriptionText} numberOfLines={2}>
            {reklam.description}
          </Text>
        </BlurView>
      )}

      {/* The button only renders if reklam type is not 'none' AND we have a valid label */}
      {reklam.link_type !== "none" && ctaLabel && (
        <View style={contentStyles.ctaWrapper}>
          <View style={contentStyles.ctaButton}>
            <Text style={contentStyles.ctaText}>{ctaLabel}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

// ... styles remain the same
const contentStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "900",
    fontFamily: style_vars.PRIMARY_FONT,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  descriptionGlass: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    maxWidth: "85%",
    overflow: "hidden",
    marginBottom: 15,
  },
  descriptionText: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: style_vars.PRIMARY_FONT,
    lineHeight: 18,
  },
  ctaWrapper: {
    borderRadius: 30,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  ctaButton: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  ctaText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 14,
    fontFamily: style_vars.PRIMARY_FONT,
  },
});
