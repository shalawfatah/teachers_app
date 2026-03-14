import { Text, SegmentedButtons } from "react-native-paper";
import { styles } from "@/styles/signup_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface GradeSelectorProps {
  value: string;
  onValueChange: (grade: string) => void;
}

export default function GradeSelector({
  value,
  onValueChange,
}: GradeSelectorProps) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <>
      <Text variant="labelLarge" style={styles.gradeLabel}>
        پۆل
      </Text>
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={[
          { value: "7", label: text.seven },
          { value: "8", label: text.eight },
          { value: "9", label: text.nine },
        ]}
        style={styles.segmented}
      />
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={[
          { value: "10", label: text.ten },
          { value: "11", label: text.eleven },
          { value: "12", label: text.twelve },
        ]}
        style={styles.segmented}
      />
    </>
  );
}
