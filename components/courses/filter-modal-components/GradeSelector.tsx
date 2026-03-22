import {style_vars} from "@/utils/style_vars";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
      <Text
        style={{
          textAlign: isRTL ? "right" : "left",
          color: "#FFF",
          marginBottom: 12,
          fontFamily: style_vars.PRIMARY_FONT, // Keeping your Kurdish font consistent
        }}
      >
        {text.class}
      </Text>

      <View style={styles.dropdownButton}>
        <Picker
          selectedValue={value ?? ""}
          onValueChange={(val) => {
            if (val !== "") onValueChange(val);
          }}
          enabled={!disabled}
          // 1. This color affects the selected text on Android
          style={{ color: "#FFFFFF" }}
          // 2. This controls the dropdown icon color on Android
          dropdownIconColor="#FFFFFF"
        >
          {grades.map((g) => (
            <Picker.Item
              key={g.value}
              label={g.label}
              value={g.value}
              color={"#FFFFFF"}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
