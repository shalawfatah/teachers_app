import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Student } from "@/types/profile";

interface UseEditProfileProps {
  profile: Student | null;
  visible: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const useEditProfile = ({
  profile,
  visible,
  onSuccess,
  onClose,
}: UseEditProfileProps) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [updating, setUpdating] = useState(false);

  // Sync internal state when profile prop changes or modal opens
  useEffect(() => {
    if (profile && visible) {
      setName(profile.name || "");
      setGrade(profile.grade?.toString() || "");
    }
  }, [profile, visible]);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("students")
        .update({
          name: name,
          grade: parseInt(grade),
        })
        .eq("id", user.id);

      if (error) throw error;

      onSuccess(); // Refresh parent data
      onClose(); // Hide modal
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  return {
    name,
    setName,
    grade,
    setGrade,
    updating,
    handleUpdate,
  };
};
