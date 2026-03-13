import { useState } from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { styles } from "@/styles/edit_course_content_styles";
import { SubjectDropdownProps } from "@/types/courses";
import { SUBJECTS } from "@/utils/placeholder_subjects";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function SubjectDropdown({
  value,
  onSelect,
  disabled = false,
}: SubjectDropdownProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View>
      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setShowMenu(true)}
            style={styles.dropdown}
            icon="chevron-down"
            disabled={disabled}
          >
            {value ? value.toUpperCase() : text.choose_subject}
          </Button>
        }
      >
        {SUBJECTS.map((s) => (
          <Menu.Item
            key={s}
            onPress={() => {
              onSelect(s);
              setShowMenu(false);
            }}
            title={s.charAt(0).toUpperCase() + s.slice(1)}
          />
        ))}
      </Menu>
    </View>
  );
}
