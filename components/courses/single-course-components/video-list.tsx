import { View } from "react-native";
import { Card, Text, List, IconButton } from "react-native-paper";
import { styles } from "@/styles/single_course_styles";
import { VideoSingle } from "@/types/videos";

interface VideosListProps {
  videos: VideoSingle[];
  canPlayVideo: (video: VideoSingle) => boolean;
  onVideoPress: (videoId: string) => void;
}

export default function VideosList({
  videos,
  canPlayVideo,
  onVideoPress,
}: VideosListProps) {
  if (videos.length === 0) {
    return (
      <Card style={styles.lessonCard}>
        <Card.Content>
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            No videos available for this course yet.
          </Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      {videos.map((video, index) => {
        const isLocked = !canPlayVideo(video);
        return (
          <Card key={video.id} style={styles.lessonCard}>
            <List.Item
              title={video.title}
              description={
                video.free ? "Free" : isLocked ? "Locked" : "Premium"
              }
              titleStyle={[styles.lessonTitle, isLocked && { color: "#999" }]}
              descriptionStyle={isLocked && { color: "#999" }}
              left={() => (
                <View style={styles.lessonNumber}>
                  <Text style={styles.lessonNumberText}>{index + 1}</Text>
                </View>
              )}
              right={() =>
                isLocked ? (
                  <IconButton icon="lock" iconColor="#999" />
                ) : (
                  <IconButton
                    icon="play-circle"
                    iconColor="#6200ee"
                    onPress={() => onVideoPress(video.id)}
                  />
                )
              }
              onPress={() => !isLocked && onVideoPress(video.id)}
              disabled={isLocked}
            />
          </Card>
        );
      })}
    </>
  );
}
