import { TextInput } from "react-native-paper";
import { CourseDropdown } from "./course-dropdown";

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
  courseId,
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
        onChangeText={onTitleChange}
        mode="outlined"
      />

      <TextInput
        label="Link"
        value={link}
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
