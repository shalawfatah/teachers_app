import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { CourseDropdown } from "./course-dropdown";

interface VideoFormFieldsProps {
  title: string;
  link: string;
  courseId: string;
  courseName: string;
  courses: { id: string; title: string }[];
  onTitleChange: (text: string) => void;
  onLinkChange: (text: string) => void;
  onCourseSelect: (id: string, name: string) => void;
}

export function VideoFormFields({
  title,
  link,
  courseName,
  courses,
  onTitleChange,
  onLinkChange,
  onCourseSelect,
}: VideoFormFieldsProps) {
  // Custom Glass Theme for these specific inputs
  const glassInputTheme = {
    colors: {
      primary: "rgba(255,255,255,0.6)", // Active border color
      onSurface: "#FFF", // Main text color
      onSurfaceVariant: "rgba(255,255,255,0.5)", // Label/Placeholder color
      outline: "rgba(255,255,255,0.15)", // Subtle border
      surfaceVariant: "transparent",
    },
  };

  return (
    <View style={formStyles.container}>
      {/* 1. TITLE INPUT */}
      <TextInput
        label="Video Title"
        value={title}
        onChangeText={onTitleChange}
        mode="outlined"
        textColor="#FFF"
        style={formStyles.input}
        theme={glassInputTheme}
      />

      {/* 2. LINK INPUT (Reduced lines for better UI flow) */}
      <TextInput
        label="Video Link (YouTube/Vimeo)"
        value={link}
        onChangeText={onLinkChange}
        mode="outlined"
        multiline
        numberOfLines={4} // 16 was a bit too tall for a modal! 4-6 is the sweet spot.
        textColor="#FFF"
        style={[formStyles.input, { minHeight: 80 }]}
        theme={glassInputTheme}
        placeholder="Paste URL here..."
        placeholderTextColor="rgba(255,255,255,0.3)"
      />

      {/* 3. COURSE SELECTOR */}
      <View style={formStyles.dropdownWrapper}>
        <CourseDropdown
          courseName={courseName}
          courses={courses}
          onSelect={onCourseSelect}
        />
      </View>
    </View>
  );
}

const formStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.04)", // Very light glass fill
    fontSize: 15,
  },
  dropdownWrapper: {
    marginTop: 5,
    borderRadius: 12,
    overflow: "hidden", // Ensures the glass effect stays within bounds
  },
});
