import React from "react";
import { View } from "react-native";
import { styles } from "@/styles/signup_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import GlassDropdown from "@/components/general/glass-dropdown";

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
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const grades = [
    { value: "7", label: text.seven },
    { value: "8", label: text.eight },
    { value: "9", label: text.nine },
    { value: "10", label: text.ten },
    { value: "11", label: text.eleven },
    { value: "12", label: text.twelve },
  ];

  return (
    <View style={styles.dropdownContainer}>
      <GlassDropdown
        label={text.class}
        value={value}
        options={grades}
        onSelect={(val) => !disabled && onValueChange(val)}
        isRTL={isRTL}
        // Since it's inside a container with its own margins, 
        // we can zero out the component's default bottom margin if needed
        style={{ marginBottom: 0 }}
      />
    </View>
  );
}
