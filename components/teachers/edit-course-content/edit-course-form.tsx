import { View } from "react-native";
import { TextInput, Text, HelperText } from "react-native-paper";
import { styles } from "@/styles/edit_course_content_styles";
import { EditCourseFormChangeProps } from "@/types/courses";
import SubjectDropdown from "./subject-dropdown";
import GradeSelector from "./grade-selector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function EditCourseForm({
  formData,
  onFieldChange,
  error,
  disabled,
}: EditCourseFormChangeProps) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View>
      <TextInput
        label={text.course_title}
        value={formData.title}
        onChangeText={(text) => onFieldChange("title", text)}
        mode="outlined"
        style={styles.input}
        disabled={disabled}
      />

      <TextInput
        label={text.description}
        value={formData.description}
        onChangeText={(text) => onFieldChange("description", text)}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
        disabled={disabled}
      />

      <TextInput
        label={text.image_link}
        value={formData.thumbnail}
        onChangeText={(text) => onFieldChange("thumbnail", text)}
        placeholder="https://image-link.com"
        mode="outlined"
        style={styles.input}
        disabled={disabled}
      />

      <Text variant="labelLarge" style={styles.label}>
        {text.subject}
      </Text>
      <SubjectDropdown
        value={formData.subject}
        onSelect={(subject) => onFieldChange("subject", subject)}
        disabled={disabled}
      />

      <Text variant="labelLarge" style={styles.label}>
        {text.class}
      </Text>
      <GradeSelector
        value={formData.grade}
        onValueChange={(grade) => onFieldChange("grade", grade)}
      />

      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}
