import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import {
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  HelperText,
  SegmentedButtons,
  Menu,
} from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

const SUBJECTS = ["math", "science", "art", "english", "history", "other"];

export default function EditCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // UI States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);

  useEffect(() => {
    if (id) fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      if (data) {
        setTitle(data.title);
        setDescription(data.description || "");
        setGrade(data.grade.toString());
        setSubject(data.subject);
        setThumbnail(data.thumbnail || "");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) return setError("Title is required");

    setSaving(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("courses")
        .update({
          title,
          description,
          grade,
          subject,
          thumbnail,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      // Navigate back on success
      router.back();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <ActivityIndicator style={styles.centered} size="large" />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.header}>
        Edit Course
      </Text>

      <TextInput
        label="Course Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
        disabled={saving}
      />

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
        disabled={saving}
      />

      <TextInput
        label="Thumbnail URL"
        value={thumbnail}
        onChangeText={setThumbnail}
        placeholder="https://image-link.com"
        mode="outlined"
        style={styles.input}
        disabled={saving}
      />

      <Text variant="labelLarge" style={styles.label}>
        Subject
      </Text>
      <View>
        <Menu
          visible={showSubjectMenu}
          onDismiss={() => setShowSubjectMenu(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setShowSubjectMenu(true)}
              style={styles.dropdown}
              icon="chevron-down"
            >
              {subject ? subject.toUpperCase() : "Select Subject"}
            </Button>
          }
        >
          {SUBJECTS.map((s) => (
            <Menu.Item
              key={s}
              onPress={() => {
                setSubject(s);
                setShowSubjectMenu(false);
              }}
              title={s.charAt(0).toUpperCase() + s.slice(1)}
            />
          ))}
        </Menu>
      </View>

      <Text variant="labelLarge" style={styles.label}>
        Grade Level
      </Text>
      <SegmentedButtons
        value={grade}
        onValueChange={setGrade}
        buttons={[
          { value: "7", label: "7" },
          { value: "8", label: "8" },
          { value: "9", label: "9" },
        ]}
        style={styles.segmented}
      />
      <SegmentedButtons
        value={grade}
        onValueChange={setGrade}
        buttons={[
          { value: "10", label: "10" },
          { value: "11", label: "11" },
          { value: "12", label: "12" },
        ]}
        style={styles.segmented}
      />

      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}

      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.flexButton}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleUpdate}
          loading={saving}
          disabled={saving}
          style={styles.flexButton}
        >
          Save Changes
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  centered: { flex: 1, justifyContent: "center" },
  header: { marginBottom: 20, fontWeight: "bold" },
  input: { marginBottom: 16 },
  label: { marginTop: 8, marginBottom: 8, fontWeight: "600" },
  dropdown: { marginBottom: 16, borderRadius: 4 },
  segmented: { marginBottom: 12 },
  buttonRow: { flexDirection: "row", gap: 12, marginTop: 24 },
  flexButton: { flex: 1 },
});
