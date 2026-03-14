import React, { useState } from "react";
import { View } from "react-native";
import { List, IconButton, Avatar, Menu, Divider } from "react-native-paper";
import { styles } from "@/styles/video_tab_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  video: any;
  onEdit: (video: any) => void;
  onDelete: (id: string) => void;
  onView: (video: any) => void;
}

export default function VideoItem({ video, onEdit, onDelete, onView }: Props) {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(null);

  return (
    <List.Item
      title={video.title}
      style={styles.listItem}
      titleStyle={{ fontFamily: "NRT-Bold", fontSize: 16 }}
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
              title={text.view_video}
              leadingIcon="eye"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                onEdit(video);
                closeMenu();
              }}
              title={text.video_update}
              leadingIcon="pencil-outline"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                onDelete(video.id);
                closeMenu();
              }}
              title={text.delete_video}
              leadingIcon="trash-can-outline"
              titleStyle={{ color: "#ff5252" }}
            />
          </Menu>
        </View>
      )}
    />
  );
}
