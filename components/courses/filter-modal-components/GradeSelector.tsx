import { useState } from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { styles } from "@/styles/signup_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface GradeDropdownProps {
  value: string;
  onValueChange: (grade: string) => void;
  disabled?: boolean;
}

export default function GradeDropdown({
  value,
  onValueChange,
  disabled = false,
}: GradeDropdownProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const grades = [
    { value: "7", label: text.seven },
    { value: "8", label: text.eight },
    { value: "9", label: text.nine },
    { value: "10", label: text.ten },
    { value: "11", label: text.eleven },
    { value: "12", label: text.twelve },
  ];

  const selectedGrade = grades.find((g) => g.value === value);

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
            {selectedGrade
              ? `${text.class} ${selectedGrade.label}`
              : text.class}
          </Button>
        }
      >
        {grades.map((g) => (
          <Menu.Item
            key={g.value}
            onPress={() => {
              onValueChange(g.value);
              setMenuVisible(false);
            }}
            title={g.label}
          />
        ))}
      </Menu>
    </View>
  );
}
