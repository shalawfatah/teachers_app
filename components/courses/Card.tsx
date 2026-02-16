import { Card, Text, Chip } from "react-native-paper";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

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
            {/* Subtle gradient overlay */}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.4)"]}
              style={styles.gradient}
            >
              {/* Badge at top */}
              <View style={styles.absoluteBadge}>
                <Chip textStyle={styles.chipText} style={styles.chip}>
                  پۆلی {item.grade}
                </Chip>
              </View>

              {/* Glassmorphism content overlay at bottom */}
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
          // Fallback for cards without thumbnail
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

const styles = StyleSheet.create({
  courseCard: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    direction: "rtl",
  },
  backgroundImage: {
    width: "100%",
    height: 240,
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 0,
  },
  absoluteBadge: {
    alignSelf: "flex-start",
    right: 8,
  },
  blurOverlay: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: "auto",
  },
  contentOverlay: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  courseTitle: {
    fontFamily: "NRT-Bold",
    fontSize: 18,
    width: "100%",
    marginBottom: 6,
    color: "#ffffff",
  },
  courseDescription: {
    fontFamily: "Goran",
    width: "100%",
    color: "#f5f5f5",
    lineHeight: 20,
  },
  chip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    height: 30,
    justifyContent: "center",
  },
  chipText: {
    fontFamily: "Goran",
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },
  // Fallback styles
  fallbackContainer: {
    minHeight: 140,
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  cardContent: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "flex-end",
  },
  chipDark: {
    backgroundColor: "#6200ee",
    height: 30,
    justifyContent: "center",
  },
  chipTextDark: {
    fontFamily: "Goran",
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  courseTitleDark: {
    fontFamily: "NRT-Bold",
    width: "100%",
    marginBottom: 4,
    color: "#000",
    textAlign: "right",
  },
  courseDescriptionDark: {
    fontFamily: "Goran",
    width: "100%",
    color: "#666",
    textAlign: "right",
  },
});
