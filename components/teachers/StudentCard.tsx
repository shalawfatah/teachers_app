import {style_vars} from "@/utils/style_vars";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native"; // Added TouchableOpacity
import {
  Text,
  Card,
  Avatar,
  IconButton,
  Menu,
  Divider,
} from "react-native-paper";
import { StudentCardProps } from "@/types/students";
import { styles } from "@/styles/teacher_students_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StudentCard({
  student,
  onView,
  onEdit,
  onDelete,
}: StudentCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { lang, isRTL } = useLanguage();
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const text = lang === 1 ? translations.eng : translations.krd;

  const isVerified = student.verified;
  const accentColor = isVerified ? "#A7F3D0" : "#FDE68A";
  const badgeBg = isVerified
    ? "rgba(167, 243, 208, 0.15)"
    : "rgba(253, 230, 138, 0.15)";

  return (
    <Card
      elevation={0}
      style={[
        styles.studentCard,
        {
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: 16,
          marginVertical: 6,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
          shadowOpacity: 0,
          overflow: "hidden", // Ensures the ripple/press effect stays in the rounded corners
        },
      ]}
    >
      {/* WRAPPER: Making the whole card tapable */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onView?.(student.id)}
      >
        <Card.Content style={{ paddingVertical: 12 }}>
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Avatar.Text
                size={48}
                label={student.name.charAt(0)}
                style={{ backgroundColor: "#325b4d", elevation: 0 }}
                labelStyle={{ color: "#FFF", fontSize: 20 }}
              />

              <View
                style={{
                  alignItems: isRTL ? "flex-end" : "flex-start",
                  marginHorizontal: 15,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 16,
                    fontWeight: "700",
                    fontFamily: style_vars.PRIMARY_FONT,
                  }}
                >
                  {student.name}
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                    marginBottom: 6,
                  }}
                >
                  {student.email}
                </Text>

                <View
                  style={[customStyles.flatBadge, { backgroundColor: badgeBg }]}
                >
                  <MaterialCommunityIcons
                    name={isVerified ? "check-circle" : "clock-outline"}
                    size={10}
                    color={accentColor}
                  />
                  <Text
                    style={[customStyles.flatBadgeText, { color: accentColor }]}
                  >
                    {isVerified ? text.verified : text.not_verified}
                  </Text>
                </View>
              </View>
            </View>

            {/* MENU: This will still work independently */}
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              contentStyle={{ backgroundColor: "#1A1A1A", borderRadius: 12 }}
              anchor={
                <IconButton
                  iconColor="rgba(255,255,255,0.4)"
                  icon="dots-vertical"
                  size={20}
                  onPress={openMenu}
                  style={{ margin: 0 }}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  onView?.(student.id);
                }}
                title={text.view}
                leadingIcon="eye"
                titleStyle={{ color: "#FFF" }}
              />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  onEdit?.(student.id);
                }}
                title={text.update}
                leadingIcon="pencil"
                titleStyle={{ color: "#FFF" }}
              />
              <Divider style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  onDelete?.(student.id);
                }}
                title={text.delete}
                leadingIcon="delete"
                titleStyle={{ color: "#FF6B6B" }}
              />
            </Menu>
          </View>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );
}

const customStyles = StyleSheet.create({
  flatBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  flatBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});
