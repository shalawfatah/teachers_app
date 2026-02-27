import { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import EditCourseForm from "@/components/teachers/edit-course-content/EditCourseForm";
import { CourseFormData } from "@/types/courses";

export default function EditCourseScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    thumbnail: "",
    grade: "",
    subject: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleUpdate = async () => {
    setSaving(true);
    setError("");

    const { error } = await supabase
      .from("courses")
      .update(formData)
      .eq("id", id)
      .select();

    if (error) setError(error.message);
    else router.replace("/(teacher)/content");
    setSaving(false);
  };

  if (loading) return <ActivityIndicator />;

  return (
    <ScrollView>
      <EditCourseForm
        formData={formData}
        onFieldChange={handleFieldChange}
        onSubmit={handleUpdate}
        error={error}
        disabled={loading || saving}
        saving={saving}
      />
    </ScrollView>
  );
}
