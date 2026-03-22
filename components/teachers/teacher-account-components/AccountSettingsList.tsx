import React from "react";
import { View } from "react-native";
import { List, Divider } from "react-native-paper";
import { styles } from "@/styles/teacher_account_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { AccountSettingListProps } from "@/types/setting_modal";
import { style_vars } from "@/utils/style_vars";

export default function AccountSettingsList({
  onEditPress,
  onSettingsPress,
}: AccountSettingListProps) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  // Shared styles to keep the code clean
  const whiteTitle = { color: "#FFFFFF", fontWeight: "600" as const };
  const whiteDesc = { color: "rgba(255, 255, 255, 0.6)" };
  const iconColor = "#FFFFFF";
  const subheaderColor = "rgba(255, 255, 255, 0.5)";

  return (
    <View
      style={[styles.settingsContainer, { direction: isRTL ? "rtl" : "ltr" }]}
    >
      <List.Section>
        <List.Subheader style={{ color: subheaderColor }}>
          {text.acc_setting}
        </List.Subheader>
        <List.Item
          title={text.update_acc}
          description={text.update_info}
          titleStyle={whiteTitle}
          descriptionStyle={whiteDesc}
          left={(p) => (
            <List.Icon {...p} icon="account-edit" color={iconColor} />
          )}
          right={(p) => (
            <List.Icon
              {...p}
              icon="chevron-right"
              color={style_vars.MUTED_WHITE_BORDER}
            />
          )}
          onPress={onEditPress}
        />
        <Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
      </List.Section>

      <List.Section>
        <List.Subheader style={{ color: subheaderColor }}>
          {text.support}
        </List.Subheader>
        <List.Item
          title={text.help}
          titleStyle={whiteTitle}
          left={(p) => (
            <List.Icon {...p} icon="help-circle" color={iconColor} />
          )}
          onPress={() => onSettingsPress("help")}
        />
        <Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
        <List.Item
          title={text.about}
          titleStyle={whiteTitle}
          left={(p) => (
            <List.Icon {...p} icon="information" color={iconColor} />
          )}
          onPress={() => onSettingsPress("about")}
        />
      </List.Section>
    </View>
  );
}
