import { View, FlatList, Alert } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { styles } from "@/styles/teacher_students_styles";
import Loader from "@/components/Loader";
import { StudentCard } from "@/components/teachers/StudentCard";
import { StudentProps } from "@/types/students";
import StudentChip from "@/components/teachers/StudentChip";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase"; // Ensure this is imported

export default function StudentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentProps[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      // 1. Get current logged-in teacher
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      // 2. Fetch students assigned to this teacher
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("teacher_id", user?.id) // Filtering by current teacher
        .order("name", { ascending: true });

      if (error) throw error;

      setStudents(data || []);
    } catch (err: any) {
      console.error("Error fetching students:", err.message);
      Alert.alert("Error", "Could not load students.");
    } finally {
      setLoading(false);
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleView = (studentId: string) => {
    router.push(`/(teacher)/students/view/${studentId}`);
  };

  const handleEdit = (studentId: string) => {
    router.push(`/(teacher)/students/edit/${studentId}`);
  };

  const handleDelete = async (studentId: string) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("students")
            .delete()
            .eq("id", studentId);
          if (!error) fetchStudents(); // Refresh list
        },
      },
    ]);
  };

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

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search students..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={filteredStudents} // Using real filtered data
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No students found.
          </Text>
        }
      />
    </View>
  );
}
