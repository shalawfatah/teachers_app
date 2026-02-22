import React from "react";
import { View } from "react-native";
import { List, Divider } from "react-native-paper";
import { styles } from "@/styles/teacher_account_styles";

interface Props {
  onEditPress: () => void;
  onSettingsPress: (type: "help" | "about") => void;
}

export const AccountSettingsList = ({
  onEditPress,
  onSettingsPress,
}: Props) => (
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
    </List.Section>

    <List.Section>
      <List.Subheader>پشتیوانی</List.Subheader>
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
