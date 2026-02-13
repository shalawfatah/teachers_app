import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, TextInput, Button } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { Teacher } from "@/types/profile";

interface EditProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  profile: Teacher | null;
  onProfileUpdate: () => void; // To refresh the parent screen
}

export default function EditProfileModal({
  visible,
  onDismiss,
  profile,
  onProfileUpdate,
}: EditProfileModalProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");
  const [updating, setUpdating] = useState(false);

  // Sync internal state when profile opens
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setExpertise(profile.expertise || "");
    }
  }, [profile, visible]);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("teachers")
        .update({
          name: name,
          bio: bio,
          expertise: expertise,
        })
        .eq("id", user.id);

      if (error) throw error;

      onProfileUpdate(); // Refresh the account screen
      onDismiss(); // Close modal
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Text variant="headlineSmall" style={styles.title}>
          Edit Profile
        </Text>

        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
        />

        <TextInput
          label="Expertise"
          value={expertise}
          onChangeText={setExpertise}
          mode="outlined"
          placeholder="e.g., Mathematics, Physics, Computer Science"
          style={styles.input}
        />

        <View style={styles.buttonRow}>
          <Button mode="text" onPress={onDismiss} style={styles.button}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleUpdate}
            loading={updating}
            disabled={updating || !name}
            style={styles.button}
          >
            Save Changes
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    marginLeft: 10,
  },
});
