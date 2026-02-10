import { courses_styles } from "@/styles/courses";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

export default function Loader() {
  return (
    <View style={courses_styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
}
