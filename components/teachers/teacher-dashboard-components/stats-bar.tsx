import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@/styles/teacher_home_styles";
import { TeacherStats } from "@/types/teacher";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface StatsBarProps {
  stats: TeacherStats | null;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text variant="headlineMedium" style={styles.statNumber}>
          {stats?.videos_count || 0}
        </Text>
        <Text variant="bodyMedium" style={styles.statLabel}>
          {text.video}
        </Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.stat}>
        <Text variant="headlineMedium" style={styles.statNumber}>
          {stats?.courses_count || 0}
        </Text>
        <Text variant="bodyMedium" style={styles.statLabel}>
          {text.course}
        </Text>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.stat}>
        <Text variant="headlineMedium" style={styles.statNumber}>
          {stats?.students_count || 0}
        </Text>
        <Text variant="bodyMedium" style={styles.statLabel}>
          {text.students}
        </Text>
      </View>
    </View>
  );
}
