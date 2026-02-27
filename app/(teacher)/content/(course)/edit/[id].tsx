import { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import EditCourseForm from "@/components/teachers/edit-course-content/EditCourseForm";
import { CourseFormData } from "@/types/courses";

export default function EditCourseScreen() {
  const { id } = useLocalSearchParams();
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    thumbnail: "",
    grade: "",
    subject: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) setError(error.message);
      else
        setFormData({
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          grade: data.grade,
          subject: data.subject,
        });
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  const handleFieldChange = (field: keyof CourseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <ActivityIndicator />;

  return (
    <ScrollView>
      <EditCourseForm
        formData={formData}
        onFieldChange={handleFieldChange}
        error={error}
        disabled={loading}
      />
    </ScrollView>
  );
}
