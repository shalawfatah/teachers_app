import { StyleSheet, View, Dimensions } from "react-native";
import { Modal, Portal, IconButton } from "react-native-paper";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";

interface Props {
  visible: boolean;
  video: { link: string; video_hls_url?: string } | null; // Added hls field to type
  onDismiss: () => void;
}

export default function VideoPlayerModal({ visible, video, onDismiss }: Props) {
  // 1. Determine the source and add the Referer header
  const videoSource = {
    uri: video?.video_hls_url || video?.link || "",
    headers: {
      "Referer": "https://teachers-dash.netlify.app",
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
  });

  // 2. Control playback based on visibility
  useEffect(() => {
    if (visible && video) {
      player.play();
    } else {
      player.pause();
    }
  }, [visible, video, player]);

  if (!video) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          player.pause();
          onDismiss();
        }}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.container}>
          <IconButton
            icon="close"
            iconColor="white"
            size={30}
            style={styles.closeButton}
            onPress={onDismiss}
          />

          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            startsPictureInPictureAutomatically
            nativeControls={true} // Added this so users can play/pause in the modal
          />
        </View>
      </Modal>
    </Portal>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "black",
    margin: 0,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  video: {
    width: width,
    height: height * 0.4,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
