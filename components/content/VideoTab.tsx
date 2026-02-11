import { FlatList, View, StyleSheet } from "react-native";
import { List, IconButton, Avatar } from "react-native-paper";
import { Video } from "@/types/videos";

interface VideosTabProps {
  data: Video[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function VideosTab({ data, onEdit, onDelete }: VideosTabProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <List.Item
          title={item.title}
          description={`${item.duration} • ${item.views ?? 0} views`}
          style={styles.listItem}
          left={() => (
            <Avatar.Image
              size={48}
              source={{
                uri: item.thumbnail || "https://via.placeholder.com/150",
              }}
            />
          )}
          right={() => (
            <View style={styles.row}>
              <IconButton
                icon="pencil-outline"
                size={20}
                onPress={() => onEdit(item.id)}
              />
              <IconButton
                icon="trash-can-outline"
                size={20}
                iconColor="#ff5252"
                onPress={() => onDelete(item.id)}
              />
            </View>
          )}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 100 },
  listItem: {
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 12,
    elevation: 1,
  },
  row: { flexDirection: "row", alignItems: "center" },
});
