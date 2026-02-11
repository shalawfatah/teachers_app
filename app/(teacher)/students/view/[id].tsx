import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Avatar, Card, Text, Divider, Button, Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StudentProps } from "@/types/students";

export default function ViewStudent() {
  const { id } = useLocalSearchParams();

  const student: StudentProps = {
    id: Array.isArray(id) ? id[0] : id,
    full_name: "John Doe",
    email: "john.doe@university.edu",
    enrolled_courses: 4,
    last_active: "2024-05-20",
    status: "active",
  };

  const statusColor = student.status === "active" ? "#4caf50" : "#f44336";

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Student Profile" }} />

      <View style={styles.hero}>
        <Avatar.Text
          size={80}
          label={student.full_name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          style={{ backgroundColor: "#6200ee" }}
        />
        <Text variant="headlineMedium" style={styles.name}>
          {student.full_name}
        </Text>
        <Chip
          icon="circle"
          selectedColor="white"
          style={{ backgroundColor: statusColor }}
        >
          {student.status.toUpperCase()}
        </Chip>
      </View>

      {/* Details Card */}
      <Card style={styles.card}>
        <Card.Content>
          <DetailItem
            icon="email-outline"
            label="Email Address"
            value={student.email}
          />
          <Divider style={styles.divider} />
          <DetailItem
            icon="book-open-variant"
            label="Enrolled Courses"
            value={`${student.enrolled_courses} Courses`}
          />
          <Divider style={styles.divider} />
          <DetailItem
            icon="clock-outline"
            label="Last Active"
            value={student.last_active}
          />
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => console.log("Edit", student.id)}
          style={styles.button}
          icon="pencil"
        >
          Edit Student
        </Button>
        <Button
          mode="outlined"
          onPress={() => console.log("Delete", student.id)}
          textColor="#f44336"
          style={[styles.button, { borderColor: "#f44336" }]}
          icon="trash-can-outline"
        >
          Delete Record
        </Button>
      </View>
    </ScrollView>
  );
}

// Helper component for layout consistency
function DetailItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <MaterialCommunityIcons name={icon as any} size={24} color="#666" />
      <View style={styles.detailText}>
        <Text variant="labelMedium" style={{ color: "#666" }}>
          {label}
        </Text>
        <Text variant="bodyLarge">{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  hero: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
  },
  name: { fontWeight: "bold", marginTop: 15, marginBottom: 8 },
  card: { margin: 16, borderRadius: 12, backgroundColor: "white" },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  detailText: { marginLeft: 16 },
  divider: { marginVertical: 4 },
  actions: { padding: 16, gap: 12 },
  button: { borderRadius: 8 },
});
