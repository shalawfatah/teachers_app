import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { styles } from "@/styles/edit_profile_modal_styles";
import { ImageUploader } from "./image-uploader";
import { translations } from "@/utils/eng_krd";
import { ProfileFormProps } from "@/types/profile";

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
  lang,
  isRTL,
}: ProfileFormProps) {
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View>
      <TextInput
        label={text.name}
        value={name}
        onChangeText={onNameChange}
        theme={{
          colors: {
            onSurface: "#fff",
          },
        }}
        mode="outlined"
        style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
      />

      <TextInput
        label={text.expertise}
        value={expertise}
        onChangeText={onExpertiseChange}
        textColor="#fff"
        theme={{
          colors: { primary: "#fff", outline: "rgba(255,255,255,0.4)" },
        }}
        mode="outlined"
        placeholder="e.g., Mathematics, Physics, Computer Science"
        style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
      />

      <Text
        variant="labelLarge"
        theme={{
          colors: {
            onSurface: "#fff",
          },
        }}
        style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}
      >
        {text.update_acc}
      </Text>
      <ImageUploader
        imageUri={thumbnail}
        onUpload={onUploadThumbnail}
        uploading={uploadingThumbnail}
        type="thumbnail"
        placeholderText="Tap to upload thumbnail"
      />

      <Text
        variant="labelLarge"
        style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}
      >
        {text.profile_cover}
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
