import { styles } from "@/styles/setting_modal";
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
              داوای داتا و زانیاری
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
          داخستن
        </Button>
      </Modal>
    </Portal>
  );
}
