import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@/styles/teacher_students_styles";
import Loader from "@/components/Loader";
import useStudents from "../../../components/teachers/teacher-student-components/useStudents";
import StudentHeader from "../../../components/teachers/teacher-student-components/StudentHeader";
import StudentCard from "@/components/teachers/StudentCard";

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

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <StudentHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={<Text>No students found.</Text>}
      />
    </View>
  );
}
