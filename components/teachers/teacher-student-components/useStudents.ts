import { useState, useEffect, useMemo } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { StudentProps } from "@/types/students";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function useStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentProps[]>([]);
  const router = useRouter();
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("teacher_id", user?.id)
        .order("name", { ascending: true });

      if (error) throw error;
      setStudents(data || []);
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      Alert.alert("Error", "Could not load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [students, searchQuery]);

  const handleDelete = (studentId: string) => {
    Alert.alert(text.delete, text.students_delete_text, [
      { text: text.cancel, style: "cancel" },
      {
        text: text.delete,
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("students")
            .delete()
            .eq("id", studentId);
          if (!error) fetchStudents();
        },
      },
    ]);
  };

  return {
    searchQuery,
    setSearchQuery,
    loading,
    filteredStudents,
    handleView: (id: string) => router.push(`/(teacher)/students/view/${id}`),
    handleEdit: (id: string) => router.push(`/(teacher)/students/edit/${id}`),
    handleDelete,
  };
}
