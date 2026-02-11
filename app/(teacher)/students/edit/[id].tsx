import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import {
  TextInput,
  Button,
  SegmentedButtons,
  Surface,
  Text,
} from "react-native-paper";
import { StudentProps } from "@/types/students";
import { styles } from "@/styles/student_edit_styles";

export default function EditStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<StudentProps>({
    id: Array.isArray(id) ? id[0] : id || "",
    full_name: "John Doe",
    email: "john.doe@university.edu",
    enrolled_courses: 4,
    last_active: "",
    status: "active",
  });

  const handleSave = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Saving to Supabase:", form);

    setLoading(false);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Stack.Screen
        options={{ title: "Edit Student", headerRight: () => null }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Surface style={styles.formCard} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            General Information
          </Text>

          <TextInput
            label="Full Name"
            value={form.full_name}
            onChangeText={(text) => setForm({ ...form, full_name: text })}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Email Address"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Enrolled Courses"
            value={form.enrolled_courses.toString()}
            onChangeText={(text) =>
              setForm({ ...form, enrolled_courses: parseInt(text) || 0 })
            }
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            left={<TextInput.Icon icon="book-open-variant" />}
          />

          <Text variant="labelLarge" style={styles.label}>
            Student Status
          </Text>
          <SegmentedButtons
            value={form.status}
            onValueChange={(value) =>
              setForm({ ...form, status: value as "active" | "inactive" })
            }
            buttons={[
              { value: "active", label: "Active", icon: "check-circle" },
              { value: "inactive", label: "Inactive", icon: "close-circle" },
            ]}
            style={styles.segmented}
          />
        </Surface>

        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
            contentStyle={{ height: 48 }}
          >
            {loading ? "Saving Changes..." : "Save Student"}
          </Button>

          <Button mode="text" onPress={() => router.back()} disabled={loading}>
            Cancel
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
