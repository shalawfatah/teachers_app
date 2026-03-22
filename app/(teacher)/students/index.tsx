import React from "react";
import { View, FlatList, StyleSheet } from "react-native"; // Added StyleSheet
import { Text } from "react-native-paper";
import { styles } from "@/styles/teacher_students_styles";
import Loader from "@/components/Loader";
import useStudents from "@/components/teachers/teacher-student-components/useStudents";
import StudentHeader from "@/components/teachers/teacher-student-components/StudentHeader";
import StudentCard from "@/components/teachers/StudentCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { LinearGradient } from "expo-linear-gradient"; // Import this
import { gradient_colors } from "@/utils/gradient_colors"; // Import this
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes"; // Import this
import { SafeAreaView } from "react-native-safe-area-context"; // Better for headers

export default function StudentsScreen() {
  const {
    loading,
    searchQuery,
    setSearchQuery,
    filteredStudents,
    handleView,
    handleEdit,
    handleDelete,
  } = useStudents();

  const { isRTL } = useLanguage();

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 1. The Background Layer */}
      <LinearGradient
        colors={gradient_colors}
        style={StyleSheet.absoluteFill}
      />
      <BackgroundShapes />

      {/* 2. The Content Layer */}
      <View
        style={[
          styles.container,
          {
            flex: 1,
            backgroundColor: "transparent",
            direction: isRTL ? "rtl" : "ltr",
          },
        ]}
      >
        <StudentHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: 20 }]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <StudentCard
              student={item}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          ListEmptyComponent={
            <Text
              style={{
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              No students found.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
