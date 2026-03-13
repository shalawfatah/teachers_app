import { styles } from "@/styles/single_course_styles";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function NoCourse() {
  const router = useRouter();
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text variant="headlineSmall">{text.course_not_found}</Text>
      <Button
        mode="contained"
        onPress={() => router.back()}
        style={{ marginTop: 20 }}
      >
        {text.go_back}
      </Button>
    </View>
  );
}
