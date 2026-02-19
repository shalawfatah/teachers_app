import React, { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground, StatusBar } from "react-native";
import { Text, IconButton, Card, Chip, Button, List } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { styles } from "@/styles/single_course_styles";
import NoCourse from "@/components/courses/NoCourse";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";

type Video = {
  id: string;
  title: string;
  free: boolean;
  thumbnail: string;
};

export default function SingleCourse() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState<any>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchCourseData();
    }
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: studentData } = await supabase
          .from("students")
          .select("verified")
          .eq("id", user.id)
          .single();

        setIsVerified(studentData?.verified || false);
      }

      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      const { data: videosData, error: videosError } = await supabase
        .from("videos")
        .select("id, title, free, thumbnail")
        .eq("course_id", id)
        .order("created_at", { ascending: true });

      if (videosError) throw videosError;
      setVideos(videosData || []);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  const canPlayVideo = (video: Video) => {
    return video.free || isVerified;
  };

  const handleVideoPress = (video: Video) => {
    if (canPlayVideo(video)) {
      router.push(`/video/${video.id}`);
    } else {
      console.log("Video locked - verification required");
    }
  };

  if (loading) return <Loader />;
  if (!course) return <NoCourse />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: course.thumbnail }}
          style={styles.heroImage}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
            style={styles.gradient}
          >
            <IconButton
              icon="arrow-left"
              iconColor="white"
              size={24}
              onPress={() => router.back()}
              style={styles.backButton}
            />
            <View style={styles.heroContent}>
              <View style={styles.badgeRow}>
                <Chip textStyle={styles.chipText} style={styles.categoryChip}>
                  {isVerified ? "بینینی ڤیدیۆ رێپێدراوە" : "هەژمار رێپێنەدراوە"}
                </Chip>
              </View>
              <Text variant="headlineMedium" style={styles.title}>
                {course.title}
              </Text>
              <View style={styles.metaRow}>
                <IconButton
                  icon="play-circle-outline"
                  iconColor="white"
                  size={20}
                  style={{ margin: 0 }}
                />
                <Text style={styles.metaText}>
                  ژمارەی وانە: {videos.length}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.contentBody}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            دەربارەی ئەم خولە
          </Text>
          <Text variant="bodyMedium" style={styles.descriptionText}>
            {course.description}
          </Text>

          {!isVerified && (
            <Card style={[styles.lessonCard, { backgroundColor: "#fff3e0" }]}>
              <Card.Content>
                <Text variant="titleMedium" style={{ color: "#e65100" }}>
                  🔒 مافی بینینی ڤیدیۆکان بەدەستبێنە
                </Text>
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  پەوەیندی بە مامۆستای ئەپەکەوە بکە بۆ بەدەستهێنانی مافی بیهنینی
                  تەواوی ڤیدیۆکان
                </Text>
              </Card.Content>
            </Card>
          )}

          <View style={styles.curriculumHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              لیستی ڤیدیۆکان
            </Text>
          </View>

          {videos.length === 0 ? (
            <Card style={styles.lessonCard}>
              <Card.Content>
                <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                  No videos available for this course yet.
                </Text>
              </Card.Content>
            </Card>
          ) : (
            videos.map((video, index) => {
              const isLocked = !canPlayVideo(video);
              return (
                <Card key={video.id} style={styles.lessonCard}>
                  <List.Item
                    title={video.title}
                    description={
                      video.free ? "Free" : isVerified ? "Premium" : "Locked"
                    }
                    titleStyle={[
                      styles.lessonTitle,
                      isLocked && { color: "#999" },
                    ]}
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
                          onPress={() => handleVideoPress(video)}
                        />
                      )
                    }
                    onPress={() => !isLocked && handleVideoPress(video)}
                    disabled={isLocked}
                  />
                </Card>
              );
            })
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          style={styles.primaryButton}
          contentStyle={{ height: 56 }}
          labelStyle={styles.buttonLabel}
          onPress={() => {
            const firstPlayableVideo = videos.find((v) => canPlayVideo(v));
            if (firstPlayableVideo) {
              handleVideoPress(firstPlayableVideo);
            }
          }}
          disabled={videos.length === 0 || !videos.some((v) => canPlayVideo(v))}
        >
          دەستپێکی خول
        </Button>
      </View>
    </View>
  );
}
