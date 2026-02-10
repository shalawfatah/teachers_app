import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import {
  Text,
  Card,
  FAB,
  Searchbar,
  ActivityIndicator,
  Chip,
  IconButton,
  Menu,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploaded_at: string;
}

export default function VideosScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch videos from Supabase
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Placeholder videos
  const placeholderVideos = [
    {
      id: "1",
      title: "Introduction to React Hooks",
      description: "Learn the basics of useState and useEffect",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      duration: "24:30",
      views: 1234,
      uploaded_at: "2024-02-01",
    },
    {
      id: "2",
      title: "Building REST APIs with Node.js",
      description: "Complete guide to Express.js and MongoDB",
      thumbnail:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      duration: "45:12",
      views: 856,
      uploaded_at: "2024-02-05",
    },
    {
      id: "3",
      title: "CSS Grid Layout Masterclass",
      description: "Master modern CSS layouts",
      thumbnail:
        "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400",
      duration: "32:45",
      views: 2103,
      uploaded_at: "2024-02-08",
    },
  ];

  const openMenu = (videoId: string) => setMenuVisible(videoId);
  const closeMenu = () => setMenuVisible(null);

  const handleEdit = (videoId: string) => {
    closeMenu();
    console.log("Edit video:", videoId);
  };

  const handleDelete = (videoId: string) => {
    closeMenu();
    console.log("Delete video:", videoId);
  };

  const renderVideo = ({ item }: { item: Video }) => (
    <Card style={styles.videoCard}>
      <View style={styles.cardHeader}>
        <Card.Cover source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.durationBadge}>
          <Text variant="bodySmall" style={styles.durationText}>
            {item.duration}
          </Text>
        </View>
      </View>
      <Card.Content style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text
            variant="titleMedium"
            style={styles.videoTitle}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Menu
            visible={menuVisible === item.id}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={20}
                onPress={() => openMenu(item.id)}
              />
            }
          >
            <Menu.Item
              onPress={() => handleEdit(item.id)}
              title="Edit"
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={() => handleDelete(item.id)}
              title="Delete"
              leadingIcon="delete"
            />
          </Menu>
        </View>
        <Text
          variant="bodyMedium"
          style={styles.videoDescription}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={styles.videoFooter}>
          <Chip icon="eye" style={styles.chip} compact>
            {item.views} views
          </Chip>
          <Text variant="bodySmall" style={styles.uploadDate}>
            {new Date(item.uploaded_at).toLocaleDateString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          My Videos
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Manage and upload your video content
        </Text>
      </View>

      {/* Stats Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsScroll}
        contentContainerStyle={styles.statsContainer}
      >
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.statNumber}>
              156
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Total Videos
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.statNumber}>
              24.5K
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Total Views
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.statNumber}>
              3.2K
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              This Month
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search videos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      {/* Videos List */}
      <FlatList
        data={placeholderVideos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Upload FAB */}
      <FAB
        icon="upload"
        style={styles.fab}
        label="Upload Video"
        onPress={() => console.log("Upload video")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#666",
  },
  statsScroll: {
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    minWidth: 120,
  },
  statNumber: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  statLabel: {
    color: "#666",
    marginTop: 4,
  },
  searchContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  videoCard: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    position: "relative",
  },
  thumbnail: {
    height: 180,
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardContent: {
    paddingTop: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  videoTitle: {
    fontWeight: "bold",
    flex: 1,
    marginBottom: 4,
  },
  videoDescription: {
    color: "#666",
    marginBottom: 12,
  },
  videoFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chip: {
    alignSelf: "flex-start",
  },
  uploadDate: {
    color: "#999",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
