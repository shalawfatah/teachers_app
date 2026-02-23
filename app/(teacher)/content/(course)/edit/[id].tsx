import { View } from "react-native";
import { TextInput, Text, HelperText } from "react-native-paper";
import { styles } from "@/styles/edit_course_content_styles";
import { EditCourseFormProps } from "@/types/courses";
import SubjectDropdown from "@/components/teachers/edit-course-content/subject-dropdown";
import { GradeSelector } from "@/components/courses/grade-selector";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditCourseForm({
  formData,
  onFieldChange,
  error,
  disabled,
}: EditCourseFormProps) {
  return (
    <SafeAreaView style={{padding:12}}>
      <TextInput
        label="ناونیشانی خول"
        value={formData?.title}
        onChangeText={(text) => onFieldChange("title", text)}
        mode="outlined"
        style={styles.input}
        disabled={disabled}
      />

      <TextInput
        label="وەسف"
        value={formData?.description}
        onChangeText={(text) => onFieldChange("description", text)}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
        disabled={disabled}
      />

      <TextInput
        label="لینکی وێنە"
        value={formData?.thumbnail}
        onChangeText={(text) => onFieldChange("thumbnail", text)}
        placeholder="https://image-link.com"
        mode="outlined"
        style={styles.input}
        disabled={disabled}
      />

      <Text variant="labelLarge" style={styles.label}>
        بابەت
      </Text>
      <SubjectDropdown
        value={formData?.subject}
        onSelect={(subject) => onFieldChange("subject", subject)}
        disabled={disabled}
      />

      <Text variant="labelLarge" style={styles.label}>
        پۆل
      </Text>
      <GradeSelector
        value={formData?.grade}
        onValueChange={(grade) => onFieldChange("grade", grade)}
      />

      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}
    </SafeAreaView>
  );
}
