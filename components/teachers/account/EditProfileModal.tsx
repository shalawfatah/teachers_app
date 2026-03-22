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
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";

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
        <LinearGradient colors={gradient_colors} style={{ borderRadius: 24 }}>
          <BlurView
            intensity={90}
            tint="dark"
            style={{ padding: 24, borderRadius: 24 }}
          >
            <View style={styles.container}>
              <Text
                variant="headlineSmall"
                style={[
                  styles.title,
                  { textAlign: isRTL ? "right" : "left", color: "#FFF" },
                ]}
              >
                {text.update_acc}
              </Text>

              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                {/* NOTE: Ensure ProfileForm passes these theme overrides to its internal TextInputs
                 */}
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
                    gap: 12,
                    marginTop: 20,
                  },
                ]}
              >
                <Button
                  mode="outlined"
                  onPress={onDismiss}
                  textColor="#FFFFFF"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: 12,
                  }}
                >
                  {text.cancel}
                </Button>

                <Button
                  mode="contained"
                  onPress={handleUpdate}
                  loading={updating}
                  disabled={updating || !name}
                  buttonColor="#FF8C00"
                  textColor="#000"
                  style={{ borderRadius: 12, minWidth: 100 }}
                >
                  {text.save}
                </Button>
              </View>
            </View>
          </BlurView>
        </LinearGradient>
      </Modal>
    </Portal>
  );
}
