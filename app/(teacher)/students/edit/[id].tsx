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
import { useSafeAreaInsets } from "react-native-safe-area-context"; // 1. Import Insets
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
  const insets = useSafeAreaInsets(); // 2. Initialize insets
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust based on your header height
    >
      {/* Background Layer */}
      <LinearGradient
        colors={gradient_colors}
        style={StyleSheet.absoluteFill}
      />
      <BackgroundShapes />

      <Stack.Screen
        options={{
          title: text.update,
          headerRight: () => null,
        }}
      />

      <ScrollView
        style={styles.container}
        // 3. Notch protection (Top) and keyboard/home-bar protection (Bottom)
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 10,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 20, // Ensure content isn't hitting edges
          },
        ]}
      >
        <Surface
          style={[
            styles.formCard,
            { direction: isRTL ? "rtl" : "ltr", borderRadius: 16 },
          ]}
          elevation={1}
        >
          <StudentInfo student={student} />
        </Surface>

        <StatusToggle verified={verified} onStatusChange={setVerified} />

        <View
          style={{
            gap: 12,
            marginTop: 24,
            marginBottom: 10,
          }}
        >
          <View>
            <PrimaryButton
              text={saving ? text.update : text.save}
              icon={"content-save"}
              action={handleSave}
              loading={saving}
            />
          </View>

          <View style={{ flex: 1 }}>
            <SecondaryButton
              text={text.cancel}
              icon={"cancel"}
              action={() => router.back()}
              disabled={saving}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
