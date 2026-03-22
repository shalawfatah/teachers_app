import {style_vars} from "@/utils/style_vars";
import { useLanguage } from "@/contexts/LanguageContext";
import { SettingsModalProps } from "@/types/modal";
import { translations } from "@/utils/eng_krd";
import React from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, List, Divider } from "react-native-paper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";

export default function SettingsModal({
  type,
  visible,
  onDismiss,
}: SettingsModalProps) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const itemTitleStyle = {
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 16,
    textAlign: isRTL ? ("right" as const) : ("left" as const),
  };

  const iconColor = "#FFF";

  const renderContent = () => {
    switch (type) {
      case "help":
        return (
          <View style={{ paddingBottom: 10 }}>
            <List.Item
              title={text.faq}
              titleStyle={itemTitleStyle}
              left={(p) => (
                <List.Icon
                  {...p}
                  icon="frequently-asked-questions"
                  color={iconColor}
                />
              )}
            />
            <Divider
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                marginVertical: 4,
              }}
            />
            <List.Item
              title={text.help}
              titleStyle={itemTitleStyle}
              left={(p) => (
                <List.Icon {...p} icon="email-outline" color={iconColor} />
              )}
            />
            <Divider
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                marginVertical: 4,
              }}
            />
            <List.Item
              title={text.report_bug}
              titleStyle={itemTitleStyle}
              left={(p) => <List.Icon {...p} icon="bug" color={iconColor} />}
            />
          </View>
        );
      case "about":
        return (
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <Text
              variant="headlineSmall"
              style={{
                color: "#FFF",
                fontFamily: style_vars.PRIMARY_FONT,
                textAlign: "center",
              }}
            >
              {text.rava_app}
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Goran",
                textAlign: "center",
                marginTop: 4,
              }}
            >
              {text.version} 1.0.5
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                marginTop: 20,
                color: "#FFF",
                fontFamily: "Goran",
                textAlign: "center",
                lineHeight: 24,
                paddingHorizontal: 10,
              }}
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
    if (type === "help") return text.help;
    if (type === "about") return text.about;
    return "";
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        // FIXED: Removed the clip-prone styles and replaced with safe margins
        contentContainerStyle={{
          margin: 20,
          backgroundColor: "transparent",
        }}
      >
        <LinearGradient
          colors={gradient_colors}
          style={{
            borderRadius: 24,
            overflow: "hidden",
            // Added border to match your Student layout glass effect
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <BlurView
            intensity={95}
            tint="dark"
            // FIXED: Explicit padding here ensures content isn't cut off by the rounded corners
            style={{ padding: 24 }}
          >
            <Text
              variant="headlineSmall"
              style={{
                color: "#FFF",
                fontFamily: style_vars.PRIMARY_FONT,
                textAlign: isRTL ? "right" : "left",
                marginBottom: 15,
                paddingTop: 5, // Extra safety for top-right/left titles
              }}
            >
              {getTitle()}
            </Text>

            <ScrollView
              style={{ maxHeight: 350 }} // Slightly shorter to guarantee button visibility
              showsVerticalScrollIndicator={false}
              // Allows the content inside to breathe
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {renderContent()}
            </ScrollView>

            <View style={{ marginTop: 20, paddingBottom: 5 }}>
              <Button
                mode="contained"
                onPress={onDismiss}
                buttonColor="#FFFFFF"
                textColor="#000000"
                style={{
                  borderRadius: 14,
                  height: 50,
                  justifyContent: "center",
                  // Adding shadow specifically to the button for "pop"
                  elevation: 4,
                }}
                labelStyle={{ fontFamily: style_vars.PRIMARY_FONT, fontSize: 16 }}
              >
                {text.close}
              </Button>
            </View>
          </BlurView>
        </LinearGradient>
      </Modal>
    </Portal>
  );
}
