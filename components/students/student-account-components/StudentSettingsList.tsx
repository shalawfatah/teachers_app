import React from "react";
import { View } from "react-native";
import { List, Divider } from "react-native-paper";
import { styles } from "@/styles/account_styles";
import { SettingsType } from "@/types/modal";

interface Props {
  onEditPress: () => void;
  onSettingsPress: (type: SettingsType) => void;
}

export default function StudentSettingsList({
  onEditPress,
  onSettingsPress,
}: Props) {
  return (
    <View style={styles.settingsContainer}>
      <List.Section>
        <List.Subheader>سازاندنی هەژمار</List.Subheader>
        <List.Item
          title="نوێکردنەوەی هەژمار"
          description="زانیارییەکانت نوێبکەرەوە"
          left={(p) => <List.Icon {...p} icon="account-edit" />}
          right={(p) => <List.Icon {...p} icon="chevron-right" />}
          onPress={onEditPress}
        />
        <Divider />
        <List.Item
          title="پاراستنی زانیاری"
          description="پاراستنی زانیاریی و اسایشی ئەپ"
          left={(p) => <List.Icon {...p} icon="shield-account" />}
          right={(p) => <List.Icon {...p} icon="chevron-right" />}
          onPress={() => onSettingsPress("privacy")}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>یارمەتی</List.Subheader>
        <List.Item
          title="یارمەتی"
          left={(p) => <List.Icon {...p} icon="help-circle" />}
          onPress={() => onSettingsPress("help")}
        />
        <Divider />
        <List.Item
          title="دەربارە"
          left={(p) => <List.Icon {...p} icon="information" />}
          onPress={() => onSettingsPress("about")}
        />
      </List.Section>
    </View>
  );
}
