import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text style={{ fontSize: 20 }}>{text.screen_not_exist}</Text>
      <Link href="/" style={{ marginTop: 15, color: "blue" }}>
        {text.go_home}
      </Link>
    </View>
  );
}
