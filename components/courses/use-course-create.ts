import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface CourseFormData {
  title: string;
  description: string;
  grade: string;
  subject: string;
}

export function useCourseCreate(onSuccess: () => void, onDismiss: () => void) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    grade: "9",
    subject: "math",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof CourseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      setError("Course title is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found");

      const { error: insertError } = await supabase.from("courses").insert({
        title: formData.title,
        description: formData.description,
        grade: formData.grade,
        subject: formData.subject,
        teacher_id: user.id,
      });

      if (insertError) throw insertError;

      // Reset form
      setFormData({ title: "", description: "", grade: "9", subject: "math" });
      onSuccess();
      onDismiss();
    } catch (err: any) {
      setError(err.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, error, updateField, handleSubmit };
}
