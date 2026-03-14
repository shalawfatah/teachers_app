import { View, ImageBackground } from "react-native";
import { Text, IconButton, Chip } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/single_course_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface CourseHeroProps {
  course: {
    title: string;
    thumbnail: string;
  };
  videosCount: number;
  isVerified: boolean;
  onBack: () => void;
}

export default function CourseHero({
  course,
  videosCount,
  isVerified,
  onBack,
}: CourseHeroProps) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
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
          onPress={onBack}
          style={styles.backButton}
        />
        <View style={styles.heroContent}>
          <View style={styles.badgeRow}>
            <Chip textStyle={styles.chipText} style={styles.categoryChip}>
              {isVerified ? text.video_permitted : text.video_not_permitted}
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
            <Text
              style={[styles.metaText, { direction: isRTL ? "rtl" : "ltr" }]}
            >
              {text.number_of_lessons} {videosCount}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
