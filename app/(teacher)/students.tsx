import { View, FlatList } from "react-native";
import { Text, Card, Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { placeholderStudents } from "@/utils/placeholder_students";
import { styles } from "@/styles/teacher_students_styles";
import Loader from "@/components/Loader";
import { StudentCard } from "@/components/teachers/StudentCard"; // Import the new component
import { StudentProps } from "@/types/students";
import StudentChip from "@/components/teachers/StudentChip";

export default function StudentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleView = (studentId: string) => {
    console.log("View student:", studentId);
  };

  const handleEdit = (studentId: string) => {
    console.log("Edit student:", studentId);
  };

  const handleDelete = (studentId: string) => {
    console.log("Delete student:", studentId);
  };

  const renderStudent = ({ item }: { item: StudentProps }) => (
    <StudentCard
      student={item}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Students
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Manage your enrolled students
        </Text>
      </View>
      <StudentChip />
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search students..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={placeholderStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
