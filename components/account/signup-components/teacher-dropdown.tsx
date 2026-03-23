import { View } from "react-native";
import { styles } from "@/styles/signup_styles";
import { TeacherShort } from "@/types/teacher";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { useEffect } from "react";
import GlassDropdown from "@/components/general/glass-dropdown";

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

  // Sync initial selection if none exists
  useEffect(() => {
    if (!selectedTeacherId && teachers.length > 0) {
      onSelect(teachers[0].id);
    }
  }, [teachers]);

  // Map teachers to the format expected by GlassDropdown
  const teacherOptions = teachers.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  return (
    <View style={styles.dropdownContainer}>
      <GlassDropdown
        label={text.choose_teacher}
        value={selectedTeacherId ?? ""}
        options={teacherOptions}
        onSelect={(value) => !disabled && onSelect(value)}
        isRTL={isRTL}
        // You can pass custom styles here if needed to override
        // the default margin in the reusable component
        style={{ marginBottom: 0 }}
      />
    </View>
  );
}
