import { styles } from "@/styles/reklam_carousel";
import { Text } from "react-native-paper";
import { View } from "react-native";
import BrushBackground from "../BrushBackground";
import { Reklam } from "@/types/reklam";

function getCtaLabel(linkType: string): string {
  switch (linkType) {
    case "course":
      return "بینینی خول";
    case "video":
      return "سەیرکردنی ڤیدیۆ";
    case "document":
      return "داگرتن";
    case "external":
      return "کردنەوە";
    default:
      return "";
  }
}

export function SlideContent({ reklam }: { reklam: Reklam }) {
  const ctaLabel = getCtaLabel(reklam.link_type);

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
