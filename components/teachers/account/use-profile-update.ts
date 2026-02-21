import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface UpdateProfileParams {
  name: string;
  expertise: string;
  thumbnail: string | null;
  coverImg: string | null;
}

export function useProfileUpdate(onSuccess: () => void, onDismiss: () => void) {
  const [updating, setUpdating] = useState(false);

  const updateProfile = async ({
    name,
    expertise,
    thumbnail,
    coverImg,
  }: UpdateProfileParams) => {
    try {
      setUpdating(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("teachers")
        .update({
          name,
          expertise,
          thumbnail,
          cover_img: coverImg,
        })
        .eq("id", user.id);

      if (error) throw error;

      onSuccess();
      onDismiss();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return { updating, updateProfile };
}
