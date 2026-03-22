import { useLanguage } from "@/contexts/LanguageContext";
import { styles } from "@/styles/setting_modal";
import { SettingsModalProps } from "@/types/modal";
import { translations } from "@/utils/eng_krd";
import React from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, List, Divider } from "react-native-paper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { style_vars } from "@/utils/style_vars";

export default function SettingsModal({
  type,
  visible,
  onDismiss,
}: SettingsModalProps) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const itemTitleStyle = {
    color: "#FFF",
    fontFamily: "NRT-Bold",
    fontSize: 16,
    textAlign: isRTL ? "right" : ("left" as const),
  };
  const iconColor = "#FFF";

  const renderContent = () => {
    switch (type) {
      case "privacy":
        return (
          <View>
            <Text
              variant="bodyMedium"
              style={[
                styles.text,
                {
                  color: "#FFF",
                  fontFamily: "Goran",
                  lineHeight: 24,
                  textAlign: isRTL ? "right" : "left",
                },
              ]}
            >
              {text.privacy_text}
            </Text>
            <Button
              mode="outlined"
              onPress={() => { }}
              textColor="#FFF"
              style={[
                styles.actionButton,
                { borderColor: style_vars.MUTED_WHITE_BORDER, marginTop: 24 },
              ]}
              labelStyle={{ fontFamily: "NRT-Bold" }}
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
              titleStyle={itemTitleStyle}
              left={(p) => (
                <List.Icon
                  {...p}
                  icon="frequently-asked-questions"
                  color={iconColor}
                />
              )}
            />
            <Divider style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            <List.Item
              title={text.contact}
              titleStyle={itemTitleStyle}
              left={(p) => (
                <List.Icon {...p} icon="email-outline" color={iconColor} />
              )}
            />
            <Divider style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            <List.Item
              title={text.report_bug}
              titleStyle={itemTitleStyle}
              left={(p) => <List.Icon {...p} icon="bug" color={iconColor} />}
            />
          </View>
        );
      case "about":
        return (
          <View style={styles.centerAlign}>
            <Text
              variant="headlineSmall"
              style={{ color: "#FFF", fontFamily: "NRT-Bold" }}
            >
              {text.rava_app}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Goran" }}
            >
              {text.version} 1.0.5
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.text,
                {
                  marginTop: 15,
                  color: "#FFF",
                  fontFamily: "Goran",
                  textAlign: "center",
                },
              ]}
            >
              {text.expo_text}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "privacy":
        return text.safety_security;
      case "help":
        return text.help;
      case "about":
        return text.about;
      default:
        return "";
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          {
            padding: 0,
            backgroundColor: "transparent",
            overflow: "hidden",
            margin: 20,
          },
        ]}
      >
        <LinearGradient colors={gradient_colors} style={{ borderRadius: 24 }}>
          <BlurView
            intensity={90}
            tint="dark"
            style={{ padding: 24, borderRadius: 24 }} // Matched border radius to parent
          >
            <Text
              variant="headlineSmall"
              style={[
                styles.modalTitle,
                {
                  color: "#FFF",
                  fontFamily: "NRT-Bold",
                  textAlign: isRTL ? "right" : "left",
                  marginBottom: 20,
                  marginTop: 4, // Added small top margin to title instead of padding
                },
              ]}
            >
              {getTitle()}
            </Text>

            <ScrollView
              style={[styles.scrollBody, { maxHeight: 400 }]}
              showsVerticalScrollIndicator={false}
            >
              {renderContent()}
            </ScrollView>

            <Button
              mode="contained"
              onPress={onDismiss}
              style={[
                styles.closeButton,
                { backgroundColor: "#FFF", marginTop: 24, marginBottom: 4 }, // Added bottom margin
              ]}
              labelStyle={{ color: "#000", fontFamily: "NRT-Bold" }}
            >
              {text.close}
            </Button>
          </BlurView>
        </LinearGradient>
      </Modal>
    </Portal>
  );
}
