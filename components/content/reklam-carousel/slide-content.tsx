import { styles } from "@/styles/reklam_carousel";
import { Text } from "react-native-paper";
import { View } from "react-native";
import BrushBackground from "../BrushBackground";
import { Reklam } from "@/types/reklam";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

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

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{reklam.title}</Text>
      {reklam.description && (
        <View style={styles.descriptionWrapper}>
          <BrushBackground colors={["#FFFF00", "#737000"]} />
          <Text style={styles.descriptionText}>{reklam.description}</Text>
        </View>
      )}
      {/* CTA button */}
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
