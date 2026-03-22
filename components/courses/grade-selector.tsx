import { SegmentedButtons } from "react-native-paper";
import { styles } from "@/styles/create_carousel_styles";
import { edit_course_content_grades } from "@/utils/edit_course_content_grades";
import { style_vars } from "@/utils/style_vars";

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
            secondaryContainer: style_vars.PRIMARY_WHITE_BUTTON, // selected button bg
            onSecondaryContainer: "#fff", // selected button text
            outline: "#fff", // ✅ this controls the border color
          },
        }}
      />
      <SegmentedButtons
        value={value}
        theme={{
          colors: {
            secondaryContainer: style_vars.PRIMARY_WHITE_BUTTON, // selected button bg
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
