import { SegmentedButtons } from "react-native-paper";
import { styles } from "@/styles/create_carousel_styles";
import { edit_course_content_grades } from "@/utils/edit_course_content_grades";

interface GradeSelectorProps {
  value: string;
  onValueChange: (grade: string) => void;
}

export function GradeSelector({ value, onValueChange }: GradeSelectorProps) {
  return (
    <>
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={edit_course_content_grades}
        style={styles.segmented}
        theme={{
          colors: {
            secondaryContainer: "#FF8C00", // selected button bg
            onSecondaryContainer: "#fff", // selected button text
            outline: "#fff", // ✅ this controls the border color
          },
        }}
      />
      <SegmentedButtons
        value={value}
        theme={{
          colors: {
            secondaryContainer: "#FF8C00", // selected button bg
            onSecondaryContainer: "#fff", // selected button text
            outline: "#fff", // ✅ this controls the border color
          },
        }}
        onValueChange={onValueChange}
        buttons={edit_course_content_grades}
        style={styles.segmented}
      />
    </>
  );
}
