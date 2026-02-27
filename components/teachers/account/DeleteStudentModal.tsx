import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button, Surface } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

interface DeleteStudentModalProps {
  visible: boolean;
  onDismiss: () => void;
  studentId: string;
  studentName: string;
}

export default function DeleteStudentModal({
  visible,
  onDismiss,
  studentId,
  studentName,
}: DeleteStudentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.rpc("delete_student_account", {
        student_id: studentId,
      });

      if (error) throw error;

      // Navigate back to students list or dashboard
      router.back();
    } catch (error) {
      console.error("Error deleting student account:", error);
      setError("هەڵەیەک ڕوویدا لە کاتی سڕینەوەی هەژمار");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Surface style={styles.surface} elevation={4}>
          <Text variant="headlineSmall" style={styles.title}>
            سڕینەوەی هەژماری خوێندکار
          </Text>
          <Text variant="bodyMedium" style={styles.message}>
            ئایا دڵنیایت کە دەتەوێت هەژماری{" "}
            <Text style={styles.studentName}>{studentName}</Text> بسڕیتەوە؟ ئەم
            کارە گەرێنەوەی نییە و هەموو داتاکانی خوێندکار بە تەواوی دەسڕێتەوە.
          </Text>

          {error && (
            <Text variant="bodySmall" style={styles.error}>
              {error}
            </Text>
          )}

          <View style={styles.actions}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              style={styles.cancelButton}
              disabled={loading}
            >
              پاشگەزبوونەوە
            </Button>
            <Button
              mode="contained"
              onPress={handleConfirmDelete}
              loading={loading}
              disabled={loading}
              style={styles.deleteButton}
              buttonColor="#d32f2f"
            >
              سڕینەوە
            </Button>
          </View>
        </Surface>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  surface: {
    borderRadius: 16,
    padding: 24,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 12,
    color: "#d32f2f",
  },
  message: {
    textAlign: "center",
    color: "#555",
    lineHeight: 22,
    marginBottom: 24,
  },
  studentName: {
    fontWeight: "bold",
    color: "#000",
  },
  error: {
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
  },
  deleteButton: {
    flex: 1,
  },
});
