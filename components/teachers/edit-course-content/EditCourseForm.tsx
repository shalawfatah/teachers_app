import { TextInput, Text, HelperText, Button } from "react-native-paper";
import { styles } from "@/styles/edit_course_content_styles";
import { EditCourseFormProps } from "@/types/courses";
import SubjectDropdown from "@/components/teachers/edit-course-content/subject-dropdown";
import { GradeSelector } from "@/components/courses/grade-selector";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function EditCourseForm({
  formData,
  onFieldChange,
  onSubmit,
  error,
  disabled,
  saving,
}: EditCourseFormProps) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <SafeAreaView style={{ padding: 12, marginTop: 24}}>
      <TextInput
        label={text.course_title}
        value={formData?.title}
        onChangeText={(text) => onFieldChange("title", text)}
        mode="outlined"
        style={styles.input}
        disabled={disabled}
        theme={{
          colors: {
            onSurface: "#FFF",
            onSurfaceVariant: "#FFF",
          },
        }}
      />
      <TextInput
        label={text.description}
        value={formData?.description}
        onChangeText={(text) => onFieldChange("description", text)}
        mode="outlined"
        multiline
        numberOfLines={12}
        style={styles.input}
        disabled={disabled}
        theme={{ colors: { onSurface: "#FFF", onSurfaceVariant: "#FFF" } }}
      />
      <TextInput
        label={text.image_link}
        value={formData?.thumbnail}
        onChangeText={(text) => onFieldChange("thumbnail", text)}
        placeholder="https://image-link.com"
        multiline
        numberOfLines={16}
        mode="outlined"
        style={styles.input}
        disabled={disabled}
        theme={{ colors: { onSurface: "#FFF", onSurfaceVariant: "#FFF" } }}
      />
      <Text variant="labelLarge" style={styles.label}>
        {text.subject}
      </Text>
      <SubjectDropdown
        value={formData?.subject}
        onSelect={(subject) => onFieldChange("subject", subject)}
        disabled={disabled}
      />
      <Text variant="labelLarge" style={styles.label}>
        {text.class}
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
      <Button
        mode="contained"
        onPress={onSubmit}
        loading={saving}
        disabled={disabled || saving}
        style={{ marginTop: 16, backgroundColor: "#FF8C00" }}
        labelStyle={{ color: "#000" }}
      >
        {text.update}
      </Button>
    </SafeAreaView>
  );
}
