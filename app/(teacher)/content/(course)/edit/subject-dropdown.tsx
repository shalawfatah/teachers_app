import { useState } from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { styles } from "@/styles/edit_course_content_styles";

const SUBJECTS = ["math", "science", "art", "english", "history", "other"];

interface SubjectDropdownProps {
  value: string;
  onSelect: (subject: string) => void;
  disabled?: boolean;
}

export function SubjectDropdown({
  value,
  onSelect,
  disabled = false,
}: SubjectDropdownProps) {
  const [showMenu, setShowMenu] = useState(false);

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
            {value ? value.toUpperCase() : "Select Subject"}
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
