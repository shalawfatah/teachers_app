import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Surface } from "react-native-paper";
import { styles } from "@/styles/student_edit_styles";
import Loader from "@/components/Loader";
import useStudentData from "@/components/teachers/edit-course-components/useStudentData";
import StatusToggle from "@/components/teachers/edit-course-components/StatusToggle";
import StudentInfo from "@/components/teachers/edit-course-components/StudentInfo";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";
import PrimaryButton from "@/components/general/primary-button";
import SecondaryButton from "@/components/general/secondary-button";

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
      <LinearGradient
        colors={gradient_colors}
        style={[StyleSheet.absoluteFill, { flex: 1 }]}
      />
      <BackgroundShapes />
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
          <PrimaryButton
            text={saving ? text.update : text.save}
            icon={"content-save"}
            action={handleSave}
          />
          <SecondaryButton
            text={text.cancel}
            icon={"cancel"}
            action={() => router.back()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
