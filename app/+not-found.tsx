import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text style={{ fontSize: 20 }}>This screen doesn't exist.</Text>
      <Link href="/" style={{ marginTop: 15, color: "blue" }}>
        Go to home screen!
      </Link>
    </View>
  );
}
