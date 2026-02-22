import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CourseFormData } from "@/types/courses";

export function useCourseEdit(courseId: string) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    grade: "",
    subject: "",
    thumbnail: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

      if (fetchError) throw fetchError;

      if (data) {
        setFormData({
          title: data.title,
          description: data.description || "",
          grade: data.grade.toString(),
          subject: data.subject,
          thumbnail: data.thumbnail || "",
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof CourseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (): Promise<boolean> => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }

    setSaving(true);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("courses")
        .update({
          title: formData.title,
          description: formData.description,
          grade: formData.grade,
          subject: formData.subject,
          thumbnail: formData.thumbnail,
        })
        .eq("id", courseId);

      if (updateError) throw updateError;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { formData, loading, saving, error, updateField, handleUpdate };
}
