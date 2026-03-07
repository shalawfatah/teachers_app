import { useState } from "react";
import { Alert, Linking } from "react-native"; // Added Linking
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";

type ImageType = "thumbnail" | "cover";

export function useImageUpload(
  type: ImageType,
  setImageUri: (uri: string) => void,
) {
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const { status: existingStatus, canAskAgain } =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      if (existingStatus === "denied" && !canAskAgain) {
        Alert.alert(
          "Permission Required",
          "To upload images, please enable Photo Library access in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: type === "thumbnail" ? [1, 1] : [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setUploading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileExt = uri.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${user.id}_${type}_${Date.now()}.${fileExt}`;
      const filePath = `${type === "thumbnail" ? "thumbnails" : "covers"}/${fileName}`;
      const contentType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("teacher-images")
        .upload(filePath, decode(base64), {
          contentType,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("teacher-images").getPublicUrl(filePath);

      setImageUri(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return { uploading, uploadImage: pickImage };
}
