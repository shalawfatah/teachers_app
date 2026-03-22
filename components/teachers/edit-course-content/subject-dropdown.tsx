import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import { SubjectDropdownProps } from "@/types/courses";
import { SUBJECTS } from "@/utils/placeholder_subjects";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { style_vars } from "@/utils/style_vars";

export default function SubjectDropdown({
  value,
  onSelect,
  disabled = false,
}: SubjectDropdownProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View>
      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        // 1. STYLE THE DROPDOWN WINDOW
        contentStyle={dropdownStyles.menuContent}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setShowMenu(true)}
            style={dropdownStyles.anchorButton}
            contentStyle={{
              flexDirection: isRTL ? "row-reverse" : "row",
              height: 50,
            }}
            icon="chevron-down"
            disabled={disabled}
            textColor="#FFF"
            labelStyle={dropdownStyles.buttonLabel}
          >
            {value ? value.toUpperCase() : text.choose_subject}
          </Button>
        }
      >
        {SUBJECTS.map((s, index) => (
          <View key={s}>
            <Menu.Item
              onPress={() => {
                onSelect(s);
                setShowMenu(false);
              }}
              title={s.charAt(0).toUpperCase() + s.slice(1)}
              titleStyle={dropdownStyles.itemText}
              rippleColor="rgba(255,255,255,0.1)"
            />
            {index < SUBJECTS.length - 1 && (
              <Divider style={dropdownStyles.divider} />
            )}
          </View>
        ))}
      </Menu>
    </View>
  );
}

const dropdownStyles = StyleSheet.create({
  anchorButton: {
    borderRadius: 12,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
  },
  buttonLabel: {
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  menuContent: {
    backgroundColor: "rgba(30, 30, 30, 0.95)", // Dark glass
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    marginTop: 55, // Push it down so it doesn't cover the button
  },
  itemText: {
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 15,
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.08)",
    marginHorizontal: 10,
  },
});
