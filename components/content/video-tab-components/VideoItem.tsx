import { style_vars } from "@/utils/style_vars";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Menu, Divider } from "react-native-paper";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
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
  const closeMenu = () => setVisible(false);

  return (
    <Pressable onPress={() => onView(video)} activeOpacity={0.8}>
      <BlurView intensity={25} tint="dark" style={styles.card}>
        <View style={styles.glassOverlay} />

        {/* Thumbnail */}
        <Image
          source={{ uri: video.thumbnail || "https://via.placeholder.com/150" }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Play overlay on thumbnail */}
        <TouchableOpacity
          style={styles.playOverlay}
          onPress={() => onView(video)}
        >
          <View style={styles.playButton}>
            <Ionicons name="play" size={16} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          {video.description ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {video.description}
            </Text>
          ) : null}
        </View>

        {/* Three dots menu */}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color="rgba(255,255,255,0.8)"
              />
            </TouchableOpacity>
          }
          contentStyle={styles.menuContent}
        >
          <Menu.Item
            onPress={() => {
              onView(video);
              closeMenu();
            }}
            title={text.view_video}
            leadingIcon="eye"
            titleStyle={styles.menuItemText}
          />
          <Divider style={styles.menuDivider} />
          <Menu.Item
            onPress={() => {
              onEdit(video);
              closeMenu();
            }}
            title={text.video_update}
            leadingIcon="pencil-outline"
            titleStyle={styles.menuItemText}
          />
          <Divider style={styles.menuDivider} />
          <Menu.Item
            onPress={() => {
              onDelete(video.id);
              closeMenu();
            }}
            title={text.delete_video}
            leadingIcon="trash-can-outline"
            titleStyle={[styles.menuItemText, { color: "#ff5252" }]}
          />
        </Menu>
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  playOverlay: {
    position: "absolute",
    left: 10,
    top: 10,
    width: 72,
    height: 72,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 2,
  },
  content: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 4,
  },
  title: {
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 15,
    color: "#FFFFFF",
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
  },
  menuButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContent: {
    backgroundColor: "#1e1e2e",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  menuItemText: {
    fontFamily: style_vars.PRIMARY_FONT,
    color: "#fff",
    fontSize: 14,
  },
  menuDivider: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
});
