import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Button, SegmentedButtons, Surface, Text } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/student_edit_styles";
import Loader from "@/components/Loader";

export default function EditStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const [verified, setVerified] = useState<boolean>(false);

  const studentId = Array.isArray(id) ? id[0] : id || "";

  useEffect(() => {
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]); // Added studentId as dependency

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", studentId)
        .single();

      if (error) throw error;

      setStudent(data);
      setVerified(data.verified || false);
    } catch (err: any) {
      console.error("Error fetching student:", err.message);
      Alert.alert("Error", "Could not load student data.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const { error } = await supabase
        .from("students")
        .update({ verified })
        .eq("id", studentId);

      if (error) throw error;

      Alert.alert("Success", "Student status updated successfully!");
      router.back();
    } catch (err: any) {
      console.error("Error updating student:", err.message);
      Alert.alert("Error", "Could not update student status.");
    } finally {
      setSaving(false);
    }
  };

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
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Student Information
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text variant="labelLarge" style={{ marginBottom: 4 }}>
              Full Name
            </Text>
            <Text variant="bodyLarge">{student.name}</Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text variant="labelLarge" style={{ marginBottom: 4 }}>
              Email Address
            </Text>
            <Text variant="bodyLarge">{student.email}</Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text variant="labelLarge" style={{ marginBottom: 4 }}>
              Grade
            </Text>
            <Text variant="bodyLarge">{student.grade || "N/A"}</Text>
          </View>

          <Text variant="labelLarge" style={[styles.label, { marginTop: 20 }]}>
            Account Status
          </Text>
          <Text variant="bodySmall" style={{ marginBottom: 12, color: "#666" }}>
            Control whether this student can access the platform
          </Text>

          <SegmentedButtons
            value={verified ? "active" : "inactive"}
            onValueChange={(value) => setVerified(value === "active")}
            buttons={[
              {
                value: "active",
                label: "Verified",
                icon: "check-circle",
              },
              {
                value: "inactive",
                label: "Unverified",
                icon: "close-circle",
              },
            ]}
            style={styles.segmented}
          />
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
            {saving ? "Updating..." : "Update Status"}
          </Button>
          <Button mode="text" onPress={() => router.back()} disabled={saving}>
            Cancel
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
