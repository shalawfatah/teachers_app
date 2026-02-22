import React, { useState } from "react";
import { View } from "react-native";
import { List, IconButton, Avatar, Menu, Divider } from "react-native-paper";
import { styles } from "@/styles/video_tab_styles";

interface Props {
  video: any;
  onEdit: (video: any) => void;
  onDelete: (id: string) => void;
  onView: (video: any) => void;
}

export default function VideoItem({ video, onEdit, onDelete, onView }: Props) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(null);

  return (
    <List.Item
      title={video.title}
      description={`${video.duration || "0:00"} • ${video.views ?? 0} views`}
      style={styles.listItem}
      left={() => (
        <Avatar.Image
          size={48}
          source={{ uri: video.thumbnail || "https://via.placeholder.com/150" }}
        />
      )}
      right={() => (
        <View style={styles.row}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton icon="dots-vertical" size={24} onPress={openMenu} />
            }
          >
            <Menu.Item
              onPress={() => {
                onView(video);
                closeMenu();
              }}
              title="Watch Video"
              leadingIcon="eye"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                onEdit(video);
                closeMenu();
              }}
              title="Edit Video"
              leadingIcon="pencil-outline"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                onDelete(video.id);
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
  );
}
