import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@/styles/reklam_carousel";
import { Reklam } from "@/types/reklam";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

import BrushBackground from "../BrushBackground";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";
import { MountainLandscape } from "@/components/backgrounds/MountainRange";
import { GeometricPattern } from "@/components/backgrounds/GeometicPattern";

function getCtaLabel(linkType: string, lang: number): string {
  const text = lang === 1 ? translations.eng : translations.krd;

  switch (linkType) {
    case "course":
      return text.view;
    case "video":
      return text.view_video;
    case "document":
      return text.download;
    case "external":
      return text.open;
    default:
      return "";
  }
}

export function SlideContent({ reklam }: { reklam: Reklam }) {
  const { lang } = useLanguage();
  const ctaLabel = getCtaLabel(reklam.link_type, lang);

  const BackgroundComponent = useMemo(() => {
    const backgrounds = [GeometricPattern, BackgroundShapes, MountainLandscape];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  }, []);

  return (
    <View style={styles.content}>
      <BackgroundComponent />

      <Text style={styles.title}>{reklam.title}</Text>

      {reklam.description && (
        <View style={styles.descriptionWrapper}>
          <BrushBackground colors={["#FFFF00", "#737000"]} />
          <Text style={styles.descriptionText}>{reklam.description}</Text>
        </View>
      )}

      {reklam.link_type !== "none" && ctaLabel && (
        <View style={styles.ctaContainer}>
          <View style={styles.ctaButton}>
            <Text style={styles.ctaText}>{ctaLabel}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
