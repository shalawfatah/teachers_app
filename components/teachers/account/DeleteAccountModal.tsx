import React, { useState } from "react";
import { View } from "react-native";
import { Modal, Portal, Text, Button, Surface } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { styles } from "@/styles/delete_teacher_account_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

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
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

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
            {text.delete_acc}
          </Text>

          <Text variant="bodyMedium" style={styles.message}>
            {text.delete_account_text}
          </Text>

          <View style={styles.actions}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              style={styles.cancelButton}
              disabled={loading}
            >
              {text.cancel}
            </Button>
            <Button
              mode="contained"
              onPress={handleConfirmDelete}
              loading={loading}
              disabled={loading}
              style={styles.deleteButton}
              buttonColor="#d32f2f"
            >
              {text.delete}
            </Button>
          </View>
        </Surface>
      </Modal>
    </Portal>
  );
}
