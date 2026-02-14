import { StyleSheet, View, Dimensions } from "react-native";
import { Modal, Portal, IconButton } from "react-native-paper";
import { useVideoPlayer, VideoView } from "expo-video";

interface Props {
  visible: boolean;
  video: { link: string } | null;
  onDismiss: () => void;
}

export default function VideoPlayerModal({ visible, video, onDismiss }: Props) {
  // Initialize the player only if we have a link
  const player = useVideoPlayer(video?.link || "", (player) => {
    player.loop = false;
    if (visible) player.play();
  });

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
          {/* Close Button Overlay */}
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
    margin: 0, // Full screen modal
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
    height: height * 0.4, // Standard 16:9 or similar ratio
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
