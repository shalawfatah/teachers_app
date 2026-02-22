import { useState } from "react";
import { Button, Menu } from "react-native-paper";
import { styles } from "@/styles/create_carousel_styles";
import { SUBJECTS } from "@/utils/placeholder_subjects";

interface SubjectMenuProps {
  value: string;
  onSelect: (subject: string) => void;
}

export function SubjectMenu({ value, onSelect }: SubjectMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Menu
      visible={showMenu}
      onDismiss={() => setShowMenu(false)}
      anchor={
        <Button
          mode="outlined"
          onPress={() => setShowMenu(true)}
          icon="book"
          style={styles.dropdown}
        >
          {value.toUpperCase()}
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
  );
}
