import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { deleteVideo } from "@/lib/videoService";

export default function useContentManagement() {
  const [tab, setTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleDeleteVideo = (id: string) => {
    Alert.alert("Delete Video", "Are you sure you want to delete this video?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteVideo(id);
            triggerRefresh();
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  const handleDeleteCourse = async (id: string) => {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (!error) triggerRefresh();
  };

  return {
    tab,
    setTab,
    searchQuery,
    setSearchQuery,
    refreshKey,
    triggerRefresh,
    courseModalVisible,
    setCourseModalVisible,
    videoModalVisible,
    setVideoModalVisible,
    playerVisible,
    setPlayerVisible,
    selectedVideo,
    setSelectedVideo,
    handleDeleteVideo,
    handleDeleteCourse,
  };
}
