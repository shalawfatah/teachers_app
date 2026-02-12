import { supabase } from "./supabase";

export const deleteVideo = async (videoId: string) => {
  const { error } = await supabase.from("videos").delete().eq("id", videoId);

  if (error) throw error;
  return true;
};
