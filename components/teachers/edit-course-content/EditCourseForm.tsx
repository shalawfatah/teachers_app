import { TextInput, Text, HelperText, Button } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native"; // Added View & ScrollView
import { EditCourseFormProps } from "@/types/courses";
import SubjectDropdown from "@/components/teachers/edit-course-content/subject-dropdown";
import { GradeSelector } from "@/components/courses/grade-selector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { style_vars } from "@/utils/style_vars";
import { BlurView } from "expo-blur";

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

  const inputTheme = {
    colors: {
      primary: "rgba(255,255,255,0.5)", 
      onSurface: "#FFF", 
      onSurfaceVariant: "rgba(255,255,255,0.6)", 
      outline: "rgba(255,255,255,0.15)", 
      surfaceVariant: "transparent", 
    },
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <BlurView intensity={20} tint="light" style={formStyles.glassCard}>
        <TextInput
          label={text.course_title}
          value={formData?.title}
          onChangeText={(val) => onFieldChange("title", val)}
          mode="outlined"
          style={formStyles.input}
          disabled={disabled}
          textColor="#FFF"
          theme={inputTheme}
        />

        <TextInput
          label={text.description}
          value={formData?.description}
          onChangeText={(val) => onFieldChange("description", val)}
          mode="outlined"
          multiline
          numberOfLines={6} 
          style={[formStyles.input, { minHeight: 120 }]}
          disabled={disabled}
          textColor="#FFF"
          theme={inputTheme}
        />

        <TextInput
          label={text.image_link}
          value={formData?.thumbnail}
          onChangeText={(val) => onFieldChange("thumbnail", val)}
          placeholder="https://image-link.com"
          mode="outlined"
          multiline
          numberOfLines={6}
          style={formStyles.input}
          disabled={disabled}
          textColor="#FFF"
          theme={inputTheme}
        />

        <View style={{ marginBottom: 15 }}>
          <Text variant="labelLarge" style={formStyles.label}>
            {text.subject}
          </Text>
          <SubjectDropdown
            value={formData?.subject}
            onSelect={(subject) => onFieldChange("subject", subject)}
            disabled={disabled}
          />
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text variant="labelLarge" style={formStyles.label}>
            {text.class}
          </Text>
          <GradeSelector
            value={formData?.grade}
            onValueChange={(grade) => onFieldChange("grade", grade)}
          />
        </View>

        {error && (
          <HelperText
            type="error"
            visible={!!error}
            style={{ color: "#FF6B6B" }}
          >
            {error}
          </HelperText>
        )}

        <Button
          mode="contained"
          onPress={onSubmit}
          loading={saving}
          disabled={disabled || saving}
          style={formStyles.submitBtn}
          labelStyle={formStyles.submitBtnLabel}
          contentStyle={{ height: 50 }}
        >
          {text.update}
        </Button>
      </BlurView>
    </ScrollView>
  );
}

const formStyles = StyleSheet.create({
  glassCard: {
    margin: 12,
    marginTop: 24,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.03)", 
    fontSize: 15,
  },
  label: {
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: style_vars.PRIMARY_FONT,
    marginBottom: 8,
    fontSize: 14,
    marginLeft: 4,
  },
  submitBtn: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 14,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  submitBtnLabel: {
    color: "#000",
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 16,
    fontWeight: "bold",
  },
});
