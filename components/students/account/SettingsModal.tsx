import { useLanguage } from "@/contexts/LanguageContext";
import { styles } from "@/styles/setting_modal";
import { SettingsModalProps } from "@/types/modal";
import { translations } from "@/utils/eng_krd";
import React from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, List, Divider } from "react-native-paper";

export default function SettingsModal({
  type,
  visible,
  onDismiss,
}: SettingsModalProps) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const renderContent = () => {
    switch (type) {
      case "privacy":
        return (
          <View>
            <Text variant="bodyMedium" style={styles.text}>
              داتای ئەپ پارێزراوە بە بارکەهێنانی سوپابەیس. بەهیچ جۆرێک داتا و
              زانیاریی کەسیت نادرێتە لایەنێکی دیکە
            </Text>
            <Button
              mode="outlined"
              onPress={() => { }}
              style={styles.actionButton}
            >
              {text.data_request}
            </Button>
          </View>
        );
      case "help":
        return (
          <View>
            <List.Item
              title={text.question}
              left={(p) => (
                <List.Icon {...p} icon="frequently-asked-questions" />
              )}
            />
            <Divider />
            <List.Item
              title={text.contact}
              left={(p) => <List.Icon {...p} icon="email-outline" />}
            />
            <Divider />
            <List.Item
              title={text.report_bug}
              left={(p) => <List.Icon {...p} icon="bug" />}
            />
          </View>
        );
      case "about":
        return (
          <View style={styles.centerAlign}>
            <Text variant="headlineSmall">{text.rava_app}</Text>
            <Text variant="bodySmall">{text.version} 1.0.5</Text>
            <Text variant="bodyMedium" style={[styles.text, { marginTop: 15 }]}>
              {text.expo_text}
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
          {text.close}
        </Button>
      </Modal>
    </Portal>
  );
}
