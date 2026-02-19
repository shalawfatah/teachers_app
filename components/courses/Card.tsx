import { Card, Text, Chip } from "react-native-paper";
import { View, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { styles } from "@/styles/card_styles";

export const renderCourse = ({ item }: { item: any }) => {
  const hasThumbnail = item.thumbnail && item.thumbnail.trim().length > 0;

  return (
    <Link href={`/(student)/courses/${item.id}`} asChild>
      <Card style={styles.courseCard}>
        {hasThumbnail ? (
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.4)"]}
              style={styles.gradient}
            >
              <View style={styles.absoluteBadge}>
                <Chip textStyle={styles.chipText} style={styles.chip}>
                  پۆلی {item.grade}
                </Chip>
              </View>

              <BlurView intensity={60} tint="dark" style={styles.blurOverlay}>
                <View style={styles.contentOverlay}>
                  <Text
                    variant="titleLarge"
                    style={styles.courseTitle}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={styles.courseDescription}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                </View>
              </BlurView>
            </LinearGradient>
          </ImageBackground>
        ) : (
          <View style={styles.fallbackContainer}>
            <View style={styles.absoluteBadge}>
              <Chip textStyle={styles.chipTextDark} style={styles.chipDark}>
                پۆلی {item.grade}
              </Chip>
            </View>
            <Card.Content style={styles.cardContent}>
              <Text
                variant="titleMedium"
                style={styles.courseTitleDark}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text
                variant="bodyMedium"
                style={styles.courseDescriptionDark}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </Card.Content>
          </View>
        )}
      </Card>
    </Link>
  );
};
