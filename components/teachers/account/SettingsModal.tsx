import { styles } from "@/styles/teachers_account_settings_modal_styles";
import { SettingsModalProps } from "@/types/modal";
import React from "react";
import { View, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  List,
  Divider,
} from "react-native-paper";

export default function SettingsModal({
  type,
  visible,
  onDismiss,
}: SettingsModalProps) {

  const renderContent = () => {
    switch (type) {
      case "help":
        return (
          <View>
            <List.Item
              title="FAQ"
              left={(p) => (
                <List.Icon {...p} icon="frequently-asked-questions" />
              )}
            />
            <Divider />
            <List.Item
              title="Contact Support"
              left={(p) => <List.Icon {...p} icon="email-outline" />}
            />
            <Divider />
            <List.Item
              title="Report a Bug"
              left={(p) => <List.Icon {...p} icon="bug" />}
            />
          </View>
        );
      case "about":
        return (
          <View style={styles.centerAlign}>
            <Text variant="headlineSmall">LMS Mobile</Text>
            <Text variant="bodySmall">Version 1.0.0 (Build 42)</Text>
            <Text variant="bodyMedium" style={[styles.text, { marginTop: 15 }]}>
              Built with Expo and React Native Paper.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (!type) return "";
    return type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ");
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Text variant="headlineSmall" style={styles.modalTitle}>
          {getTitle()}
        </Text>
        <ScrollView style={styles.scrollBody}>{renderContent()}</ScrollView>
        <Button mode="contained" onPress={onDismiss} style={styles.closeButton}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
}
