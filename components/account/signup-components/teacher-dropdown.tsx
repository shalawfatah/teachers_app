import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View style={styles.dropdownContainer}>
      <Text style={{ textAlign: isRTL ? "right" : "left" }}>
        {text.choose_teacher}
      </Text>
      <Picker
        selectedValue={selectedTeacherId ?? ""}
        onValueChange={(value) => {
          if (value !== "") onSelect(value);
        }}
        enabled={!disabled}
        style={styles.dropdownButton}
      >
        {teachers.map((t) => (
          <Picker.Item key={t.id} label={t.name} value={t.id} />
        ))}
      </Picker>
    </View>
  );
}
