import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Button, Surface } from "react-native-paper";
import { styles } from "@/styles/student_edit_styles";
import Loader from "@/components/Loader";
import useStudentData from "@/components/teachers/edit-course-components/useStudentData";
import StatusToggle from "@/components/teachers/edit-course-components/StatusToggle";
import StudentInfo from "@/components/teachers/edit-course-components/StudentInfo";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function EditStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const studentId = Array.isArray(id) ? id[0] : id || "";
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const { student, loading, saving, verified, setVerified, handleSave } =
    useStudentData(studentId);

  if (loading) return <Loader />;
  if (!student) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Stack.Screen
        options={{ title: "Manage Student", headerRight: () => null }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Surface
          style={[styles.formCard, { direction: isRTL ? "rtl" : "ltr" }]}
          elevation={1}
        >
          <StudentInfo student={student} />
        </Surface>

        <StatusToggle verified={verified} onStatusChange={setVerified} />

        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            loading={saving}
            disabled={saving}
            style={styles.saveButton}
            contentStyle={{ height: 48 }}
          >
            {saving ? text.update : text.save}
          </Button>
          <Button mode="text" onPress={() => router.back()} disabled={saving}>
            {text.cancel}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
