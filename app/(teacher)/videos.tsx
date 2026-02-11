import { View, FlatList } from "react-native";
import { Text, FAB, Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { styles } from "@/styles/teacher_video_styles";
import VideoChips from "@/components/teachers/VideoChips";
import { VideoCard } from "@/components/teachers/VideoCard";
import Loader from "@/components/Loader";
import { placeholderVideos } from "@/utils/placeholder_videos";
import { Video } from "@/types/videos";

export default function VideosScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleEdit = (videoId: string) => {
    console.log("Edit video:", videoId);
  };

  const handleDelete = (videoId: string) => {
    console.log("Delete video:", videoId);
  };

  const renderVideo = ({ item }: { item: Video }) => (
    <VideoCard video={item} onEdit={handleEdit} onDelete={handleDelete} />
  );

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          My Videos
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Manage and upload your video content
        </Text>
      </View>
      <VideoChips />
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search videos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <FlatList
        data={placeholderVideos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        icon="upload"
        style={styles.fab}
        label="Upload Video"
        onPress={() => console.log("Upload video")}
      />
    </View>
  );
}
