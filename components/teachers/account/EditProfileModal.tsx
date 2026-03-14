import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";
import { styles } from "@/styles/edit_profile_modal_styles";
import { EditProfileModalProps } from "@/types/modal";
import { useImageUpload } from "./use-image-upload";
import { useProfileUpdate } from "./use-profile-update";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { ProfileForm } from "./profile-form";

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

  const { uploading: uploadingThumbnail, uploadImage: uploadThumbnail } =
    useImageUpload("thumbnail", setThumbnail);

  const { uploading: uploadingCover, uploadImage: uploadCover } =
    useImageUpload("cover", setCoverImg);

  const { updating, updateProfile } = useProfileUpdate(
    onProfileUpdate,
    onDismiss,
  );

  // Get language context here
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  useEffect(() => {
    if (profile && visible) {
      setName(profile.name || "");
      setExpertise(profile.expertise || "");
      setThumbnail(profile.thumbnail || null);
      setCoverImg(profile.cover_img || null);
    }
  }, [profile, visible]);

  const handleUpdate = () => {
    updateProfile({ name, expertise, thumbnail, coverImg });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          { direction: isRTL ? "rtl" : "ltr" },
        ]}
      >
        <View style={styles.container}>
          <Text
            variant="headlineSmall"
            style={[styles.title, { textAlign: isRTL ? "right" : "left" }]}
          >
            {text.update_acc}
          </Text>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <ProfileForm
              name={name}
              expertise={expertise}
              thumbnail={thumbnail}
              coverImg={coverImg}
              onNameChange={setName}
              onExpertiseChange={setExpertise}
              onUploadThumbnail={uploadThumbnail}
              onUploadCover={uploadCover}
              uploadingThumbnail={uploadingThumbnail}
              uploadingCover={uploadingCover}
              // Pass language props to child
              lang={lang}
              isRTL={isRTL}
            />
          </ScrollView>

          <View
            style={[
              styles.buttonRow,
              {
                flexDirection: isRTL ? "row-reverse" : "row",
                justifyContent: "flex-end",
              },
            ]}
          >
            <Button
              mode="contained"
              onPress={handleUpdate}
              loading={updating}
              disabled={updating || !name}
              style={styles.button}
            >
              {text.save}
            </Button>
            <Button mode="text" onPress={onDismiss} style={styles.button}>
              {text.cancel}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
