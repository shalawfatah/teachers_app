import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  Switch,
  List,
  Divider,
} from "react-native-paper";

export type SettingsType =
  | "notifications"
  | "privacy"
  | "help"
  | "about"
  | null;

interface SettingsModalProps {
  type: SettingsType;
  visible: boolean;
  onDismiss: () => void;
}

export default function SettingsModal({
  type,
  visible,
  onDismiss,
}: SettingsModalProps) {
  const [isPushEnabled, setIsPushEnabled] = React.useState(true);
  const [isEmailEnabled, setIsEmailEnabled] = React.useState(false);

  const renderContent = () => {
    switch (type) {
      case "notifications":
        return (
          <View>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              بژاردە
            </Text>
            <List.Item
              title="نۆتیفیکەیشن"
              right={() => (
                <Switch
                  value={isPushEnabled}
                  onValueChange={setIsPushEnabled}
                />
              )}
            />
            <List.Item
              title="ئیمەیل"
              right={() => (
                <Switch
                  value={isEmailEnabled}
                  onValueChange={setIsEmailEnabled}
                />
              )}
            />
          </View>
        );
      case "privacy":
        return (
          <View>
            <Text variant="bodyMedium" style={styles.text}>
              داتای ئەپ پارێزراوە بە بارکەهێنانی سوپابەیس. بەهیچ جۆرێک داتا و زانیاریی کەسیت نادرێتە لایەنێکی دیکە
            </Text>
            <Button
              mode="outlined"
              onPress={() => { }}
              style={styles.actionButton}
            >
              Request Data Export
            </Button>
          </View>
        );
      case "help":
        return (
          <View>
            <List.Item
              title="پرسیار"
              left={(p) => (
                <List.Icon {...p} icon="frequently-asked-questions" />
              )}
            />
            <Divider />
            <List.Item
              title="پەیوەندی"
              left={(p) => <List.Icon {...p} icon="email-outline" />}
            />
            <Divider />
            <List.Item
              title="راپۆرتدان لە کێشە"
              left={(p) => <List.Icon {...p} icon="bug" />}
            />
          </View>
        );
      case "about":
        return (
          <View style={styles.centerAlign}>
            <Text variant="headlineSmall">سۆفتوێری راڤە</Text>
            <Text variant="bodySmall">ڤێرژن 1.0.0 (Build 42)</Text>
            <Text variant="bodyMedium" style={[styles.text, { marginTop: 15 }]}>
              بە ئیکسپۆ و ریئاکت نەیتڤ دروستکراوە
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    maxHeight: "80%",
  },
  modalTitle: { marginBottom: 15, fontWeight: "bold" },
  sectionTitle: { marginBottom: 10, marginTop: 10, fontWeight: "600" },
  scrollBody: { marginBottom: 20 },
  text: { color: "#666", lineHeight: 20 },
  actionButton: { marginTop: 20 },
  closeButton: { marginTop: 10 },
  centerAlign: { alignItems: "center", paddingVertical: 20 },
});
