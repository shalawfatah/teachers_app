import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button, Surface } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

interface DeleteAccountModalProps {
  visible: boolean;
  onDismiss: () => void;
  userId: string;
}

export default function DeleteAccountModal({
  visible,
  onDismiss,
  userId,
}: DeleteAccountModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.rpc("delete_teacher_account", {
        teacher_id: userId,
      });

      if (error) throw error;

      await supabase.auth.signOut();
      router.replace("/");
    } catch (error) {
      console.error("Error deleting account:", error);
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
            سڕینەوەی هەژمار
          </Text>

          <Text variant="bodyMedium" style={styles.message}>
            ئایا دڵنیایت کە دەتەوێت هەژمارەکەت بسڕیتەوە؟ ئەم کارە گەرێنەوەی نییە
            و هەموو داتاکانت بە تەواوی دەسڕێتەوە.
          </Text>

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
