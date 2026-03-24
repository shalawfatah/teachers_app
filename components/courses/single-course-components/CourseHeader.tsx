import { style_vars } from "@/utils/style_vars";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { BlurView } from "expo-blur";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RavaTitle from "@/components/general/rava-title";
import RavaSubtitle from "@/components/general/rava-subtitle";

interface Props {
  courseCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenFilter: () => void;
}

export default function CourseHeader({
  courseCount,
  searchQuery,
  onSearchChange,
}: Props) {
  const { lang, isRTL } = useLanguage();
  const insets = useSafeAreaInsets();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View
      style={[
        headerStyles.wrapper,
        { paddingTop: insets.top + 10 }, // Fixes the Notch/Camera overlap
      ]}
    >
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
            // contentStyle flips the magnifying glass and clear icons
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

const headerStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  textSection: {
    marginBottom: 20,
  },
  actionRow: {
    alignItems: "center",
    gap: 12,
  },
  searchGlass: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  searchInner: {
    backgroundColor: "transparent",
    height: 50,
  },
  searchInput: {
    color: "#ffffff",
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 16,
    // Removing static paddingLeft to let RTL logic handle spacing
    paddingHorizontal: 12,
  },
});
