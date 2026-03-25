import { style_vars } from "@/utils/style_vars";
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import EditProfileModal from "@/components/students/account/EditProfileModal";
import SettingsModal from "@/components/students/account/SettingsModal";
import { SettingsType } from "@/types/modal";
import StudentSettingsList from "@/components/students/student-account-components/StudentSettingsList";
import useStudentAccount from "@/components/students/student-account-components/useStudentAccount";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { GeometricPattern } from "@/components/backgrounds/GeometicPattern";
import { accountStyles } from "@/styles/account_styles_2";
import PrimaryButton from "@/components/general/primary-button";

export default function AccountScreen() {
  const { profile, loading, handleSignOut, refreshProfile } =
    useStudentAccount();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSettingsType, setActiveSettingsType] =
    useState<SettingsType>(null);
  const { lang, isRTL } = useLanguage();
  const router = useRouter();

  const text = lang === 1 ? translations.eng : translations.krd;
  const isGuest = !profile;

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={gradient_colors} style={{ flex: 1 }} />
        <GeometricPattern />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={accountStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BlurView
          intensity={25}
          tint="light"
          style={accountStyles.profileGlassCard}
        >
          <View style={accountStyles.avatarContainer}>
            <Avatar.Text
              size={90}
              label={isGuest ? "?" : profile?.name?.charAt(0) || "U"}
              style={accountStyles.avatarShadow}
              labelStyle={{
                fontFamily: style_vars.PRIMARY_FONT,
                fontWeight: "bold",
              }}
            />
          </View>

          <Text variant="headlineSmall" style={accountStyles.userName}>
            {isGuest
              ? lang === 1
                ? "Welcome Guest"
                : "بەخێربێیت میوان"
              : profile?.name}
          </Text>
          <Text variant="bodyMedium" style={accountStyles.userRole}>
            {isGuest
              ? lang === 1
                ? "GUEST MODE"
                : "دۆخی میوان"
              : text.student.toUpperCase()}
          </Text>
        </BlurView>

        {!isGuest ? (
          <>
            <View
              style={[
                accountStyles.settingsWrapper,
                { direction: isRTL ? "rtl" : "ltr" },
              ]}
            >
              <BlurView
                intensity={15}
                tint="light"
                style={accountStyles.listGlassCard}
              >
                <StudentSettingsList
                  onEditPress={() => setIsModalVisible(true)}
                  onSettingsPress={setActiveSettingsType}
                />
              </BlurView>
            </View>
            <PrimaryButton
              text={text.logout}
              icon="logout"
              loading={loading}
              disabled={loading}
              action={handleSignOut}
            />
          </>
        ) : (
          <View style={accountStyles.settingsWrapper}>
            <BlurView
              intensity={15}
              tint="light"
              style={[accountStyles.listGlassCard, { padding: 20 }]}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 20,
                  color: "#FFF",
                  fontFamily: style_vars.PRIMARY_FONT,
                }}
              >
                {lang === 1
                  ? "Sign in to access your courses, track progress, and manage your profile."
                  : "بۆ دەستگەیشتن بە کۆرسەکان، بینینی بەرەوپێشچوون و دەستکاری کردنی پڕۆفایلەکەت، تکایە بچۆ ژوورەوە."}
              </Text>
              <PrimaryButton
                text={
                  lang === 1
                    ? "Sign In / Register"
                    : "چوونە ژوورەوە / خۆتۆمارکردن"
                }
                icon="login"
                action={() => router.push("/(auth)/login")}
              />
            </BlurView>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {!isGuest && (
        <>
          <EditProfileModal
            visible={isModalVisible}
            onDismiss={() => setIsModalVisible(false)}
            profile={profile}
            onProfileUpdate={refreshProfile}
          />
          <SettingsModal
            type={activeSettingsType}
            visible={activeSettingsType !== null}
            onDismiss={() => setActiveSettingsType(null)}
          />
        </>
      )}
    </View>
  );
}
