import { Card, Text } from "react-native-paper";
import { styles } from "@/styles/teacher_account_styles";
import { View } from "react-native";
import { StatsProps } from "@/types/account";

export default function StatsCard({
  courseNumber,
  videoNumber,
  studentNumber,
}: StatsProps) {
  return (
    <Card style={styles.statsCard}>
      <Card.Content>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              {courseNumber}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              ڤیدیۆ
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              {videoNumber}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              خول
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              {studentNumber}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
               خوێندکار
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
