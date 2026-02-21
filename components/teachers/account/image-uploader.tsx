import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { styles } from "@/styles/edit_profile_modal_styles";

interface ImageUploaderProps {
  imageUri: string | null;
  onUpload: () => Promise<void>;
  uploading: boolean;
  type: "thumbnail" | "cover";
  placeholderText: string;
}

export function ImageUploader({
  imageUri,
  onUpload,
  uploading,
  type,
  placeholderText,
}: ImageUploaderProps) {
  const containerStyle =
    type === "thumbnail" ? styles.imageContainer : styles.coverContainer;
  const imageStyle =
    type === "thumbnail" ? styles.thumbnail : styles.coverImage;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onUpload}
      disabled={uploading}
    >
      {uploading ? (
        <ActivityIndicator size="large" />
      ) : imageUri ? (
        <Image source={{ uri: imageUri }} style={imageStyle} />
      ) : (
        <View style={styles.placeholder}>
          <Text>{placeholderText}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
