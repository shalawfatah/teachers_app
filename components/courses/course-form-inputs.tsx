import { TextInput, Text } from "react-native-paper";
import { styles } from "@/styles/create_carousel_styles";
import { SubjectMenu } from "./subject-menu";
import { GradeSelector } from "./grade-selector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface CourseFormData {
  title: string;
  description: string;
  grade: string;
  subject: string;
}

interface CourseFormInputsProps {
  formData: CourseFormData;
  onFieldChange: (field: keyof CourseFormData, value: string) => void;
}

export function CourseFormInputs({
  formData,
  onFieldChange,
}: CourseFormInputsProps) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <>
      <TextInput
        label="Course Title"
        value={formData.title}
        onChangeText={(text) => onFieldChange("title", text)}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Description"
        value={formData.description}
        onChangeText={(text) => onFieldChange("description", text)}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Text variant="labelLarge" style={styles.label}>
        {text.subject}
      </Text>
      <SubjectMenu
        value={formData.subject}
        onSelect={(subject) => onFieldChange("subject", subject)}
      />

      <Text variant="labelLarge" style={styles.label}>
        {text.grade_level}
      </Text>
      <GradeSelector
        value={formData.grade}
        onValueChange={(grade) => onFieldChange("grade", grade)}
      />
    </>
  );
}
