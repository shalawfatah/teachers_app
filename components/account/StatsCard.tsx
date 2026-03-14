import { Card, Text } from "react-native-paper";
import { styles } from "@/styles/teacher_account_styles";
import { View } from "react-native";
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
    <Card style={styles.statsCard}>
      <Card.Content>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              {courseNumber}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              {text.video}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              {videoNumber}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              {text.course}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              {studentNumber}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              {text.student}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
