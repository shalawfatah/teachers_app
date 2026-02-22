import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { Course, VideoFormData } from "@/types/videos";
import { form_props } from "@/utils/form-props";

export function useVideoForm(
  visible: boolean,
  video: any,
  onSuccess: () => void,
  onDismiss: () => void,
) {
  const [formData, setFormData] = useState<VideoFormData>(form_props);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchCourses();
      if (video) {
        setFormData({
          title: video.title || "",
          link: video.link || "",
          courseId: video.course_id || "",
          courseName: video.course_id ? "" : "Select Course", // Will be set by fetchCourses
        });
      } else {
        resetForm();
      }
    }
  }, [visible, video]);

  const fetchCourses = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("courses")
      .select("id, title")
      .eq("teacher_id", user?.id);

    if (data) {
      setCourses(data);
      // If editing, find and set the course name
      if (video) {
        const current = data.find((c) => c.id === video.course_id);
        if (current) {
          setFormData((prev) => ({ ...prev, courseName: current.title }));
        }
      }
    }
  };

  const resetForm = () => {
    setFormData(form_props);
  };

  const updateField = (field: keyof VideoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.link || !formData.courseId) {
      Alert.alert(
        "Missing Fields",
        `Please fill: ${!formData.title ? "Title " : ""}${!formData.link ? "Link " : ""}${!formData.courseId ? "Course" : ""}`,
      );
      return;
    }

    setLoading(true);

    const payload = {
      title: formData.title,
      link: formData.link,
      course_id: formData.courseId,
      thumbnail: video?.thumbnail || "https://via.placeholder.com/150",
    };

    try {
      const result = video?.id
        ? await supabase.from("videos").update(payload).eq("id", video.id)
        : await supabase.from("videos").insert([payload]);

      if (result.error) {
        Alert.alert("Database Error", result.error.message);
      } else {
        onSuccess();
        onDismiss();
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { formData, courses, loading, updateField, handleSave };
}
