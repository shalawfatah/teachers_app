import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { Teacher } from "@/types/profile";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

interface EditProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  profile: Teacher | null;
  onProfileUpdate: () => void;
}

export default function EditProfileModal({
  visible,
  onDismiss,
  profile,
  onProfileUpdate,
}: EditProfileModalProps) {
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setExpertise(profile.expertise || "");
      setThumbnail(profile.thumbnail || null);
      setCoverImg(profile.cover_img || null);
    }
  }, [profile, visible]);

  const pickImage = async (type: "thumbnail" | "cover") => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant camera roll permissions to upload images.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: type === "thumbnail" ? [1, 1] : [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadImage(result.assets[0].uri, type);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const uploadImage = async (uri: string, type: "thumbnail" | "cover") => {
    try {
      type === "thumbnail"
        ? setUploadingThumbnail(true)
        : setUploadingCover(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Read file as base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Generate unique filename
      const fileExt = uri.split(".").pop();
      const fileName = `${user.id}_${type}_${Date.now()}.${fileExt}`;
      const filePath = `${type === "thumbnail" ? "thumbnails" : "covers"}/${fileName}`;

      // Convert base64 to blob for upload
      const blob = await fetch(`data:image/${fileExt};base64,${base64}`).then(
        (res) => res.blob(),
      );

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("teacher-images")
        .upload(filePath, blob, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("teacher-images").getPublicUrl(filePath);

      // Update local state
      if (type === "thumbnail") {
        setThumbnail(publicUrl);
      } else {
        setCoverImg(publicUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image");
    } finally {
      type === "thumbnail"
        ? setUploadingThumbnail(false)
        : setUploadingCover(false);
    }
  };

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
          expertise: expertise,
          thumbnail: thumbnail,
          cover_img: coverImg,
        })
        .eq("id", user.id);

      if (error) throw error;

      onProfileUpdate();
      onDismiss();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
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
          label="Expertise"
          value={expertise}
          onChangeText={setExpertise}
          mode="outlined"
          placeholder="e.g., Mathematics, Physics, Computer Science"
          style={styles.input}
        />

        {/* Thumbnail Upload */}
        <Text variant="labelLarge" style={styles.label}>
          Profile Thumbnail
        </Text>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => pickImage("thumbnail")}
          disabled={uploadingThumbnail}
        >
          {uploadingThumbnail ? (
            <ActivityIndicator size="large" />
          ) : thumbnail ? (
            <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
          ) : (
            <View style={styles.placeholder}>
              <Text>Tap to upload thumbnail</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Cover Image Upload */}
        <Text variant="labelLarge" style={styles.label}>
          Cover Image
        </Text>
        <TouchableOpacity
          style={styles.coverContainer}
          onPress={() => pickImage("cover")}
          disabled={uploadingCover}
        >
          {uploadingCover ? (
            <ActivityIndicator size="large" />
          ) : coverImg ? (
            <Image source={{ uri: coverImg }} style={styles.coverImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text>Tap to upload cover image</Text>
            </View>
          )}
        </TouchableOpacity>

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
    maxHeight: "90%",
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    marginTop: 8,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 16,
    alignSelf: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  coverContainer: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
