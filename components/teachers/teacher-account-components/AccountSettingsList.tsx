import {style_vars} from "@/utils/style_vars";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { List, Divider, Text } from "react-native-paper";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { AccountSettingListProps } from "@/types/setting_modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AccountSettingsList({
  onEditPress,
  onSettingsPress,
}: AccountSettingListProps) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const SettingItem = ({ title, icon, onPress, description }: any) => (
    <TouchableOpacity
      style={[
        settingStyles.item,
        { flexDirection: isRTL ? "row-reverse" : "row" },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[settingStyles.iconCircle, { backgroundColor: "#325b4d" }]}>
        <MaterialCommunityIcons name={icon} size={20} color="#FFF" />
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 12,
          alignItems: isRTL ? "flex-end" : "flex-start",
        }}
      >
        <Text style={settingStyles.title}>{title}</Text>
        {description && <Text style={settingStyles.desc}>{description}</Text>}
      </View>
      <MaterialCommunityIcons
        name={isRTL ? "chevron-left" : "chevron-right"}
        size={20}
        color="rgba(255,255,255,0.3)"
      />
    </TouchableOpacity>
  );

  return (
    <View style={settingStyles.glassPanel}>
      <Text
        style={[settingStyles.header, { textAlign: isRTL ? "right" : "left" }]}
      >
        {text.acc_setting}
      </Text>
      <SettingItem
        title={text.update_acc}
        description={text.update_info}
        icon="account-edit"
        onPress={onEditPress}
      />

      <Divider style={settingStyles.divider} />

      <Text
        style={[
          settingStyles.header,
          { textAlign: isRTL ? "right" : "left", marginTop: 15 },
        ]}
      >
        {text.support}
      </Text>
      <SettingItem
        title={text.help}
        icon="help-circle"
        onPress={() => onSettingsPress("help")}
      />
      <Divider style={settingStyles.divider} />
      <SettingItem
        title={text.about}
        icon="information"
        onPress={() => onSettingsPress("about")}
      />
    </View>
  );
}

const settingStyles = StyleSheet.create({
  glassPanel: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 20,
  },
  header: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontFamily: style_vars.PRIMARY_FONT,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  item: {
    paddingVertical: 12,
    alignItems: "center",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  desc: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
  },
  divider: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 4,
  },
});
