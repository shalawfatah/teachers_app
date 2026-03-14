import { useState } from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { styles } from "@/styles/signup_styles";
import { TeacherShort } from "@/types/teacher";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface TeacherDropdownProps {
  teachers: TeacherShort[];
  selectedTeacherId: string | null;
  onSelect: (teacherId: string) => void;
  disabled?: boolean;
}

export default function TeacherDropdown({
  teachers,
  selectedTeacherId,
  onSelect,
  disabled = false,
}: TeacherDropdownProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId);

  return (
    <View style={styles.dropdownContainer}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.dropdownButton}
            contentStyle={styles.dropdownButtonContent}
            icon="chevron-down"
            disabled={disabled}
          >
            {selectedTeacher
              ? `${text.teacher} ${selectedTeacher.name}`
              : text.choose_teacher}
          </Button>
        }
      >
        {teachers.length > 0 ? (
          teachers.map((t) => (
            <Menu.Item
              key={t.id}
              onPress={() => {
                onSelect(t.id);
                setMenuVisible(false);
              }}
              title={t.name}
            />
          ))
        ) : (
          <Menu.Item title={text.no_teacher_found} disabled />
        )}
      </Menu>
    </View>
  );
}
