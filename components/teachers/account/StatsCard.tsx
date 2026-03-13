import React from "react";
import { View, StyleSheet } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface StatsCardProps {
  courseCount: number;
  videoCount: number;
  studentCount: number;
}

export default function StatsCard({
  courseCount,
  videoCount,
  studentCount,
}: StatsCardProps) {
  const theme = useTheme();
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  const StatItem = ({
    icon,
    label,
    value,
  }: {
    icon: string;
    label: string;
    value: number;
  }) => (
    <Surface style={styles.statBox} elevation={1}>
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color={theme.colors.primary}
      />
      <Text variant="titleLarge" style={styles.value}>
        {value}
      </Text>
      <Text variant="labelSmall" style={styles.label}>
        {label}
      </Text>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <StatItem
        icon="book-open-variant"
        label={text.course}
        value={courseCount}
      />
      <StatItem icon="play-circle" label={text.video} value={videoCount} />
      <StatItem
        icon="account-group"
        label={text.students}
        value={studentCount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  value: { fontWeight: "bold", marginTop: 4 },
  label: { color: "#666", textTransform: "uppercase" },
});
