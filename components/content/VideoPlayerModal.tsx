import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, IconButton, Text } from "react-native-paper";
import { useVideoPlayer, VideoView } from "expo-video";

interface VideoViewModalProps {
  visible: boolean;
  video: { title: string; link: string } | null;
  onDismiss: () => void;
}

export default function VideoViewModal({
  visible,
  video,
  onDismiss,
}: VideoViewModalProps) {
  // Initialize the player with the video link
  const player = useVideoPlayer(video?.link || "", (player) => {
    player.loop = false;
    if (visible) {
      player.play();
    }
  });

  // Handle play/pause when visibility changes
  useEffect(() => {
    if (visible) {
      player.play();
    } else {
      player.pause();
    }
  }, [visible, player]);

  if (!video) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
            {video.title}
          </Text>
          <IconButton icon="close" onPress={onDismiss} />
        </View>

        <VideoView
          player={player}
          style={styles.video}
          allowsFullscreen
          allowsPictureInPicture
        />
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "black",
    margin: 0, // Full width
    height: "100%",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#000",
    position: "absolute",
    top: 50, // Avoid status bar
    left: 0,
    right: 0,
    zIndex: 10,
  },
  title: {
    color: "white",
    flex: 1,
    marginLeft: 10,
  },
  video: {
    width: "100%",
    height: 300, // Or use Aspect Ratio
  },
});
