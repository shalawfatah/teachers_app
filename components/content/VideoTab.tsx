import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { List, IconButton, Avatar, Menu, Divider } from "react-native-paper";
import { Video } from "@/types/videos";

interface VideosTabProps {
  data: Video[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function VideosTab({ data, onEdit, onDelete, onView}: VideosTabProps) {
  const [menuVisibleId, setMenuVisibleId] = useState<string | null>(null);

  const openMenu = (id: string) => setMenuVisibleId(id);
  const closeMenu = () => setMenuVisibleId(null);

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
              <Menu
                visible={menuVisibleId === item.id}
                onDismiss={closeMenu}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    size={24}
                    onPress={() => openMenu(item.id)}
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    onView(item.id);
                    closeMenu();
                  }}
                  title="Watch Video"
                  leadingIcon="eye"
                />
                <Divider />
                <Menu.Item
                  onPress={() => {
                    onEdit(item.id);
                    closeMenu();
                  }}
                  title="Edit Video"
                  leadingIcon="pencil-outline"
                />
                <Divider />
                <Menu.Item
                  onPress={() => {
                    onDelete(item.id);
                    closeMenu();
                  }}
                  title="Delete Video"
                  leadingIcon="trash-can-outline"
                  titleStyle={{ color: "#ff5252" }}
                />
              </Menu>
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
  row: { justifyContent: "center", alignItems: "center" },
});
