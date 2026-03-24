import React from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { BlurView } from "expo-blur";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RavaTitle from "@/components/general/rava-title";
import RavaSubtitle from "@/components/general/rava-subtitle";
import { CourseHeaderProps } from "@/types/courses";
import { headerStyles } from "@/styles/header_styles";

export default function CourseHeader({
  courseCount,
  searchQuery,
  onSearchChange,
}: CourseHeaderProps) {
  const { lang, isRTL } = useLanguage();
  const insets = useSafeAreaInsets();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View style={[headerStyles.wrapper, { paddingTop: insets.top + 10 }]}>
      <View style={headerStyles.textSection}>
        <RavaTitle text={text.all_courses} placement="center" />
        <RavaSubtitle
          text={`${text.available_courses} : ${courseCount}`}
          placement="center"
        />
      </View>

      <View
        style={[
          headerStyles.actionRow,
          { flexDirection: isRTL ? "row-reverse" : "row" },
        ]}
      >
        <BlurView intensity={25} tint="light" style={headerStyles.searchGlass}>
          <Searchbar
            placeholder={text.search}
            onChangeText={onSearchChange}
            value={searchQuery}
            iconColor="#ffffff"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            elevation={0}
            mode="bar"
            style={headerStyles.searchInner}
            inputStyle={[
              headerStyles.searchInput,
              {
                textAlign: isRTL ? "right" : "left",
                writingDirection: isRTL ? "rtl" : "ltr",
              },
            ]}
          />
        </BlurView>
      </View>
    </View>
  );
}
