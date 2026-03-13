import { Card, Text } from "react-native-paper";
import { styles } from "@/styles/single_course_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function VerificationBanner() {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <Card style={[styles.lessonCard, { backgroundColor: "#fff3e0" }]}>
      <Card.Content>
        <Text variant="titleMedium" style={{ color: "#e65100" }}>
          {text.video_play_permission}
        </Text>
        <Text variant="bodyMedium" style={{ marginTop: 8 }}>
          {text.video_play_permission_text}
        </Text>
      </Card.Content>
    </Card>
  );
}
