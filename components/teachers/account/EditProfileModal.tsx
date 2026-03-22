import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import { EditProfileModalProps } from "@/types/modal";
import { useImageUpload } from "./use-image-upload";
import { useProfileUpdate } from "./use-profile-update";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { ProfileForm } from "./profile-form";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import PrimaryButton from "@/components/general/primary-button";
import SecondaryButton from "@/components/general/secondary-button";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
        // FIXED: Using absolute positioning for the modal container to center it perfectly
        contentContainerStyle={{
          margin: 20,
          justifyContent: "center",
        }}
      >
        <LinearGradient
          colors={gradient_colors}
          style={{
            borderRadius: 28,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.15)",
            overflow: "hidden",
          }}
        >
          <BlurView intensity={95} tint="dark" style={{ padding: 20 }}>
            <View style={{ maxHeight: SCREEN_HEIGHT * 0.8 }}>
              {/* Header */}
              <Text
                variant="headlineSmall"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  color: "#FFF",
                  fontFamily: "NRT-Bold",
                  marginBottom: 15,
                  paddingHorizontal: 4,
                }}
              >
                {text.update_acc}
              </Text>

              {/* Scrollable Form Area */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
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
                  lang={lang}
                  isRTL={isRTL}
                />
              </ScrollView>

              {/* Action Buttons */}
              <View
                style={{
                  marginTop: 15,
                  gap: 10,
                  // Ensure buttons stay at the bottom even when scrolling
                  paddingTop: 10,
                  borderTopWidth: 1,
                  borderTopColor: "rgba(255,255,255,0.05)",
                }}
              >
                <PrimaryButton
                  text={text.save}
                  icon={"check"}
                  action={handleUpdate}
                  loading={updating}
                  disabled={updating || !name}
                />
                <SecondaryButton
                  text={text.cancel}
                  icon={"close"}
                  action={onDismiss}
                />
              </View>
            </View>
          </BlurView>
        </LinearGradient>
      </Modal>
    </Portal>
  );
}
