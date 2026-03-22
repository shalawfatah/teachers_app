import { TextInput } from "react-native-paper";
import { CourseDropdown } from "./course-dropdown";
import { whiteInputTheme } from "@/utils/theme";

interface VideoFormFieldsProps {
  title: string;
  link: string;
  courseId: string;
  courseName: string;
  courses: { id: string; title: string }[];
  onTitleChange: (text: string) => void;
  onLinkChange: (text: string) => void;
  onCourseSelect: (id: string, name: string) => void;
}

export function VideoFormFields({
  title,
  link,
  courseName,
  courses,
  onTitleChange,
  onLinkChange,
  onCourseSelect,
}: VideoFormFieldsProps) {
  return (
    <>
      <TextInput
        label="Title"
        value={title}
        style={{ backgroundColor: "transparent", color: "#FFF" }}
        theme={whiteInputTheme}
        onChangeText={onTitleChange}
        mode="outlined"
      />

      <TextInput
        label="Link"
        value={link}
        style={{ backgroundColor: "transparent" }}
        theme={whiteInputTheme}
        multiline
        numberOfLines={16}
        onChangeText={onLinkChange}
        mode="outlined"
      />

      <CourseDropdown
        courseName={courseName}
        courses={courses}
        onSelect={onCourseSelect}
      />
    </>
  );
}
