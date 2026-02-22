import { Card, Text } from "react-native-paper";
import { styles } from "@/styles/single_course_styles";

export default function VerificationBanner() {
  return (
    <Card style={[styles.lessonCard, { backgroundColor: "#fff3e0" }]}>
      <Card.Content>
        <Text variant="titleMedium" style={{ color: "#e65100" }}>
          🔒 مافی بینینی ڤیدیۆکان بەدەستبێنە
        </Text>
        <Text variant="bodyMedium" style={{ marginTop: 8 }}>
          پەوەیندی بە مامۆستای ئەپەکەوە بکە بۆ بەدەستهێنانی مافی بیهنینی تەواوی
          ڤیدیۆکان
        </Text>
      </Card.Content>
    </Card>
  );
}
