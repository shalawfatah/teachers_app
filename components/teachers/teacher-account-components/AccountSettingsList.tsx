import React from "react";
import { View } from "react-native";
import { List, Divider } from "react-native-paper";
import { styles } from "@/styles/teacher_account_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  onEditPress: () => void;
  onSettingsPress: (type: "help" | "about") => void;
}

export default function AccountSettingsList({
  onEditPress,
  onSettingsPress,
}: Props) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View
      style={[styles.settingsContainer, { direction: isRTL ? "rtl" : "ltr" }]}
    >
      <List.Section>
        <List.Subheader>{text.acc_setting}</List.Subheader>
        <List.Item
          title={text.update_acc}
          description={text.update_info}
          left={(p) => <List.Icon {...p} icon="account-edit" />}
          right={(p) => <List.Icon {...p} icon="chevron-right" />}
          onPress={onEditPress}
        />
        <Divider />
      </List.Section>

      <List.Section>
        <List.Subheader>{text.support}</List.Subheader>
        <List.Item
          title={text.help}
          left={(p) => <List.Icon {...p} icon="help-circle" />}
          onPress={() => onSettingsPress("help")}
        />
        <Divider />
        <List.Item
          title={text.about}
          left={(p) => <List.Icon {...p} icon="information" />}
          onPress={() => onSettingsPress("about")}
        />
      </List.Section>
    </View>
  );
}
