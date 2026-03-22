import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { IconButton, Menu, Divider } from "react-native-paper";
import { StyleSheet } from "react-native";

interface CourseMenuProps {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CourseMenu({
  visible,
  onOpen,
  onClose,
  onView,
  onEdit,
  onDelete,
  ...iconProps
}: CourseMenuProps & any) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <Menu
      visible={visible}
      onDismiss={onClose}
      // 1. STYLE THE POPUP WINDOW
      contentStyle={menuStyles.glassContent}
      anchor={
        <IconButton
          {...iconProps}
          iconColor="rgba(255,255,255,0.8)" // Slightly dim for better aesthetic
          icon="dots-vertical"
          onPress={onOpen}
          size={22}
        />
      }
    >
      <Menu.Item
        onPress={onView}
        title={text.view}
        leadingIcon="eye"
        titleStyle={menuStyles.itemText}
        rippleColor="rgba(255,255,255,0.1)"
      />
      <Divider style={menuStyles.divider} />

      <Menu.Item
        onPress={onEdit}
        title={text.update}
        leadingIcon="pencil"
        titleStyle={menuStyles.itemText}
        rippleColor="rgba(255,255,255,0.1)"
      />
      <Divider style={menuStyles.divider} />

      <Menu.Item
        onPress={onDelete}
        title={text.delete}
        leadingIcon="delete"
        titleStyle={menuStyles.deleteText}
        rippleColor="rgba(255,0,0,0.1)"
      />
    </Menu>
  );
}

const menuStyles = StyleSheet.create({
  glassContent: {
    // This turns the white box into a dark glass-like surface
    backgroundColor: "rgba(25, 25, 25, 0.95)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    paddingVertical: 4,
    elevation: 8, // Adds depth against the background
  },
  itemText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Goran", // Using your app font
  },
  deleteText: {
    color: "#FF6B6B", // A softer, modern red
    fontSize: 14,
    fontFamily: "Goran",
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 8,
  },
});
