import { styles } from "@/styles/teacher_students_styles";
import { Card, Text } from "react-native-paper";
import { View } from "react-native";

export default function StudentChip() {
  return (
    <View style={styles.statsContainer}>
      <Card style={styles.statCard}>
        <Card.Content style={styles.statContent}>
          <Text variant="headlineSmall" style={styles.statNumber}>
            1,247
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            Total
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.statCard}>
        <Card.Content style={styles.statContent}>
          <Text variant="headlineSmall" style={styles.statNumber}>
            1,198
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            Active
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.statCard}>
        <Card.Content style={styles.statContent}>
          <Text variant="headlineSmall" style={styles.statNumber}>
            49
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            Inactive
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}
