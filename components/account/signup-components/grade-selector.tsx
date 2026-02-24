import { Text, SegmentedButtons } from "react-native-paper";
import { styles } from "@/styles/signup_styles";

interface GradeSelectorProps {
  value: string;
  onValueChange: (grade: string) => void;
}

export default function GradeSelector({ value, onValueChange }: GradeSelectorProps) {
  return (
    <>
      <Text variant="labelLarge" style={styles.gradeLabel}>
        پۆل
      </Text>
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={[
          { value: "7", label: "7" },
          { value: "8", label: "8" },
          { value: "9", label: "9" },
        ]}
        style={styles.segmented}
      />
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={[
          { value: "10", label: "10" },
          { value: "11", label: "11" },
          { value: "12", label: "12" },
        ]}
        style={styles.segmented}
      />
    </>
  );
}
