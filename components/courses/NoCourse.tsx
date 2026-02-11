import { styles } from "@/styles/single_course_styles";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";

export default function NoCourse() {
  const router = useRouter();
  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text variant="headlineSmall">Course not found</Text>
      <Button
        mode="contained"
        onPress={() => router.back()}
        style={{ marginTop: 20 }}
      >
        Go Back
      </Button>
    </View>
  );
}
