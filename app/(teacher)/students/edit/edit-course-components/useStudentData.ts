import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export const useStudentData = (studentId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    if (studentId) fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", studentId)
        .single();

      if (error) throw error;
      setStudent(data);
      setVerified(data.verified || false);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Could not load student data.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("students")
        .update({ verified })
        .eq("id", studentId);

      if (error) throw error;
      Alert.alert("Success", "Student status updated successfully!");
      router.back();
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Error", "Could not update student status.");
    } finally {
      setSaving(false);
    }
  };

  return { student, loading, saving, verified, setVerified, handleSave };
};
