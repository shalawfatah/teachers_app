import { View } from "react-native";
import { Modal, Portal, IconButton } from "react-native-paper";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import { styles } from "@/styles/video_player_modal_styles";
import { VideoPlayerModalProps } from "@/types/modal";

export default function VideoPlayerModal({ visible, video, onDismiss }: VideoPlayerModalProps) {
  const videoSource = {
    uri: video?.video_hls_url || video?.link || "",
    headers: {
      Referer: "https://teachers-dash.netlify.app",
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
  });

  useEffect(() => {
    if (visible && video) {
      player.play();
    } else {
      player.pause();
    }
  }, [visible, video, player]);

  useEffect(() => {
    return () => {
      player.release();
    };
  }, []);

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
            nativeControls={true}
          />
        </View>
      </Modal>
    </Portal>
  );
}
