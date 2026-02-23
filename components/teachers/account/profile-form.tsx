import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { styles } from "@/styles/edit_profile_modal_styles";
import { ImageUploader } from "./image-uploader";

interface ProfileFormProps {
  name: string;
  expertise: string;
  thumbnail: string | null;
  coverImg: string | null;
  onNameChange: (name: string) => void;
  onExpertiseChange: (expertise: string) => void;
  onUploadThumbnail: () => Promise<void>;
  onUploadCover: () => Promise<void>;
  uploadingThumbnail: boolean;
  uploadingCover: boolean;
}

export function ProfileForm({
  name,
  expertise,
  thumbnail,
  coverImg,
  onNameChange,
  onExpertiseChange,
  onUploadThumbnail,
  onUploadCover,
  uploadingThumbnail,
  uploadingCover,
}: ProfileFormProps) {
  return (
    <View>
      <TextInput
        label="Full Name"
        value={name}
        onChangeText={onNameChange}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Expertise"
        value={expertise}
        onChangeText={onExpertiseChange}
        mode="outlined"
        placeholder="e.g., Mathematics, Physics, Computer Science"
        style={styles.input}
      />

      {/* Thumbnail */}
      <Text variant="labelLarge" style={styles.label}>
        وێنەی پرۆفایل
      </Text>
      <ImageUploader
        imageUri={thumbnail}
        onUpload={onUploadThumbnail}
        uploading={uploadingThumbnail}
        type="thumbnail"
        placeholderText="Tap to upload thumbnail"
      />

      {/* Cover */}
      <Text variant="labelLarge" style={styles.label}>
        کەڤەری پرۆفایل
      </Text>
      <ImageUploader
        imageUri={coverImg}
        onUpload={onUploadCover}
        uploading={uploadingCover}
        type="cover"
        placeholderText="Tap to upload cover image"
      />
    </View>
  );
}
