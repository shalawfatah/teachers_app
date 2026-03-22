import { style_vars } from "@/utils/style_vars";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Searchbar, IconButton } from "react-native-paper";
import { BlurView } from "expo-blur";
import { FilterState } from "@/types/modal";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  courseCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterState;
  onOpenFilter: () => void;
}

export default function CourseHeader({
  courseCount,
  searchQuery,
  onSearchChange,
  onOpenFilter, // Make sure this is destructured now
}: Props) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View style={headerStyles.wrapper}>
      {/* 1. TEXT SECTION */}
      <View
        style={[
          headerStyles.textSection,
          { alignItems: isRTL ? "flex-end" : "flex-start" },
        ]}
      >
        <Text variant="headlineMedium" style={headerStyles.title}>
          {text.all_courses}
        </Text>
        <Text variant="bodyMedium" style={headerStyles.subtitle}>
          {text.available_courses}: {courseCount}
        </Text>
      </View>

      {/* 2. INTERACTIVE SECTION (Search + Filter) */}
      <View
        style={[
          headerStyles.actionRow,
          { flexDirection: isRTL ? "row-reverse" : "row" },
        ]}
      >
        {/* GLASS SEARCH BAR */}
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
              { textAlign: isRTL ? "right" : "left" },
            ]}
          />
        </BlurView>

        {/* GLASS FILTER BUTTON */}
        <TouchableOpacity onPress={onOpenFilter} activeOpacity={0.7}>
          <BlurView
            intensity={40}
            tint="light"
            style={headerStyles.filterGlass}
          >
            <IconButton
              icon="tune"
              iconColor="#ffffff"
              size={24}
              style={{ margin: 0 }}
            />
          </BlurView>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
  },
  textSection: {
    marginBottom: 20,
    paddingLeft: 4,
  },
  title: {
    color: "#ffffff",
    fontFamily: style_vars.PRIMARY_FONT,
    fontWeight: "800",
    fontSize: 28,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: style_vars.PRIMARY_FONT,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  actionRow: {
    alignItems: "center",
    gap: 12,
  },
  searchGlass: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  searchInner: {
    backgroundColor: "transparent",
    height: 54,
  },
  searchInput: {
    color: "#ffffff",
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 15,
    paddingLeft: 0,
  },
  filterGlass: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
});
