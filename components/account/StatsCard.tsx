import {style_vars} from "@/utils/style_vars";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { StatsProps } from "@/types/account";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function StatsCard({
  courseNumber,
  videoNumber,
  studentNumber,
}: StatsProps) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View style={customStatsStyles.glassContainer}>
      <View style={customStatsStyles.statsRow}>
        <View style={customStatsStyles.statItem}>
          <Text style={customStatsStyles.statNumber}>{videoNumber}</Text>
          <Text style={customStatsStyles.statLabel}>{text.video}</Text>
        </View>

        <View style={customStatsStyles.divider} />

        <View style={customStatsStyles.statItem}>
          <Text style={customStatsStyles.statNumber}>{courseNumber}</Text>
          <Text style={customStatsStyles.statLabel}>{text.course}</Text>
        </View>

        <View style={customStatsStyles.divider} />

        <View style={customStatsStyles.statItem}>
          <Text style={customStatsStyles.statNumber}>{studentNumber}</Text>
          <Text style={customStatsStyles.statLabel}>{text.student}</Text>
        </View>
      </View>
    </View>
  );
}

const customStatsStyles = StyleSheet.create({
  glassContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    width: "100%",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    color: "#FFF",
    fontSize: 22,
    fontFamily: style_vars.PRIMARY_FONT,
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
