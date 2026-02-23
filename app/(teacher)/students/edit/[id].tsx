import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Button, Surface } from "react-native-paper";
import { styles } from "@/styles/student_edit_styles";
import Loader from "@/components/Loader";
import useStudentData from "@/components/teachers/edit-course-components/useStudentData";
import StatusToggle from "@/components/teachers/edit-course-components/StatusToggle";
import StudentInfo from "@/components/teachers/edit-course-components/StudentInfo";

export default function EditStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const studentId = Array.isArray(id) ? id[0] : id || "";

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
        <Surface style={styles.formCard} elevation={1}>
          <StudentInfo student={student} />
          <StatusToggle verified={verified} onStatusChange={setVerified} />
        </Surface>

        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            loading={saving}
            disabled={saving}
            style={styles.saveButton}
            contentStyle={{ height: 48 }}
          >
            {saving ? "نوێکردنەوە..." : "نوێکردنەوە"}
          </Button>
          <Button mode="text" onPress={() => router.back()} disabled={saving}>
            رەتکردنەوە
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
