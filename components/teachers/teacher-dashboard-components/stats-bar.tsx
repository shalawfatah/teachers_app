import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@/styles/teacher_home_styles";
import { TeacherStats } from "@/types/teacher";

interface StatsBarProps {
  stats: TeacherStats | null;
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text variant="headlineMedium" style={styles.statNumber}>
          {stats?.videos_count || 0}
        </Text>
        <Text variant="bodyMedium" style={styles.statLabel}>
          ڤیدیۆ
        </Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.stat}>
        <Text variant="headlineMedium" style={styles.statNumber}>
          {stats?.courses_count || 0}
        </Text>
        <Text variant="bodyMedium" style={styles.statLabel}>
          خول
        </Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.stat}>
        <Text variant="headlineMedium" style={styles.statNumber}>
          {stats?.students_count || 0}
        </Text>
        <Text variant="bodyMedium" style={styles.statLabel}>
          خوێندکار
        </Text>
      </View>
    </View>
  );
}
