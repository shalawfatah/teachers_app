import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StudentLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6200ee",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Courses",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
