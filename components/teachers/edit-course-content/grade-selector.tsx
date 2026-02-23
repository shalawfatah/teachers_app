import { SegmentedButtons } from "react-native-paper";
import { styles } from "@/styles/edit_course_content_styles";
import { edit_course_content_buttons } from "@/utils/edit_course_content_buttons";
import { edit_course_content_grades } from "@/utils/edit_course_content_grades";
import { GradeSelectorProps } from "@/types/courses";

export default function GradeSelector({
  value,
  onValueChange,
}: GradeSelectorProps) {
  return (
    <>
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={edit_course_content_buttons}
        style={styles.segmented}
      />
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={edit_course_content_grades}
        style={styles.segmented}
      />
    </>
  );
}
