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

  const titleStyle = { color: "#FFFFFF", fontFamily: "NRT-Bold", fontSize: 16 };
  const descStyle = { color: "rgba(255, 255, 255, 0.7)", fontFamily: "Goran" };
  const iconColor = "#FFFFFF";

  return (
    <View
      style={[styles.settingsContainer, { direction: isRTL ? "rtl" : "ltr" }]}
    >
      <List.Section>
        <List.Subheader
          style={{ color: "rgba(255, 255, 255, 0.5)", fontFamily: "NRT-Bold" }}
        >
          {text.account_setting}
        </List.Subheader>

        <List.Item
          title={text.update_acc}
          description={text.update_your_info}
          titleStyle={titleStyle}
          descriptionStyle={descStyle}
          left={(p) => (
            <List.Icon {...p} icon="account-edit" color={iconColor} />
          )}
          right={(p) => (
            <List.Icon
              {...p}
              icon={isRTL ? "chevron-left" : "chevron-right"}
              color={iconColor}
            />
          )}
          onPress={onEditPress}
        />
        <Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        <List.Item
          title={text.safety_security}
          description={text.safety_security}
          titleStyle={titleStyle}
          descriptionStyle={descStyle}
          left={(p) => (
            <List.Icon {...p} icon="shield-account" color={iconColor} />
          )}
          right={(p) => (
            <List.Icon
              {...p}
              icon={isRTL ? "chevron-left" : "chevron-right"}
              color={iconColor}
            />
          )}
          onPress={() => onSettingsPress("privacy")}
        />
      </List.Section>

      <List.Section>
        <List.Subheader
          style={{ color: "rgba(255, 255, 255, 0.3)", fontFamily: "NRT-Bold" }}
        >
          {text.help}
        </List.Subheader>

        <List.Item
          title={text.help}
          titleStyle={titleStyle}
          left={(p) => (
            <List.Icon {...p} icon="help-circle" color={iconColor} />
          )}
          onPress={() => onSettingsPress("help")}
        />
        <Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        <List.Item
          title={text.about}
          titleStyle={titleStyle}
          left={(p) => (
            <List.Icon {...p} icon="information" color={iconColor} />
          )}
          onPress={() => onSettingsPress("about")}
        />
      </List.Section>
    </View>
  );
}
