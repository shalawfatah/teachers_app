import { style_vars } from "@/utils/style_vars";
import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
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
        contentContainerStyle={modalStyles.modalWrapper}
      >
        <LinearGradient
          colors={gradient_colors}
          style={modalStyles.glassContainer}
        >
          <BlurView intensity={100} tint="dark" style={modalStyles.blurPadding}>
            {/* 1. FIXED HEADER */}
            <Text
              variant="headlineSmall"
              style={[
                modalStyles.headerText,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {text.update_acc}
            </Text>

            {/* 2. SCROLLABLE CONTENT AREA */}
            <View style={{ maxHeight: SCREEN_HEIGHT * 0.55 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 20 }}
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
            </View>

            {/* 3. FIXED ACTION BUTTONS (Outside ScrollView) */}
            <View style={modalStyles.actionFooter}>
              <PrimaryButton
                text={text.save}
                icon={"check"}
                action={handleUpdate}
                loading={updating}
                disabled={updating || !name}
              />
              <View style={{ marginTop: 8 }}>
                <SecondaryButton
                  text={text.cancel}
                  icon={"close"}
                  action={onDismiss}
                  disabled={updating}
                />
              </View>
            </View>
          </BlurView>
        </LinearGradient>
      </Modal>
    </Portal>
  );
}

const modalStyles = StyleSheet.create({
  modalWrapper: {
    margin: 20,
    justifyContent: "center",
  },
  glassContainer: {
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.18)",
    overflow: "hidden",
  },
  blurPadding: {
    padding: 24,
  },
  headerText: {
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
    marginBottom: 20,
    fontWeight: "800",
    fontSize: 24,
  },
  actionFooter: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    flexDirection: "column", // Stacked to ensure full visibility
  },
});
