import { styles } from "@/styles/teacher_video_styles";
import { Card, Text } from "react-native-paper";
import { View} from "react-native";

export default function VideoChips() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 12}}>
      <Card style={styles.statCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.statNumber}>
            156
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            Total Videos
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.statCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.statNumber}>
            24.5K
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            Total Views
          </Text>
        </Card.Content>
      </Card>
      <Card style={styles.statCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.statNumber}>
            3.2K
          </Text>
          <Text variant="bodySmall" style={styles.statLabel}>
            This Month
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}
