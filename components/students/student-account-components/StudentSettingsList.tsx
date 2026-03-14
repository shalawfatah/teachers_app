import React from "react";
import { View } from "react-native";
import { List, Divider } from "react-native-paper";
import { styles } from "@/styles/account_styles";
import { SettingsType } from "@/types/modal";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  onEditPress: () => void;
  onSettingsPress: (type: SettingsType) => void;
}

export default function StudentSettingsList({
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
        <List.Subheader>{text.account_setting}</List.Subheader>
        <List.Item
          title={text.update_acc}
          description={text.update_your_info}
          left={(p) => <List.Icon {...p} icon="account-edit" />}
          right={(p) => <List.Icon {...p} icon="chevron-right" />}
          onPress={onEditPress}
        />
        <Divider />
        <List.Item
          title={text.save}
          description={text.safety_security}
          left={(p) => <List.Icon {...p} icon="shield-account" />}
          right={(p) => <List.Icon {...p} icon="chevron-right" />}
          onPress={() => onSettingsPress("privacy")}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>{text.help}</List.Subheader>
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
