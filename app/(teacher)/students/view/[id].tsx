import React from "react";
import { View, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Avatar, Card, Text, Divider, Button, Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuxProps, StudentProps } from "@/types/students";
import { styles } from "@/styles/single_student_view_styles";

export default function ViewStudent() {
  const { id } = useLocalSearchParams();

  const student: StudentProps = {
    id: Array.isArray(id) ? id[0] : id,
    name: "John Doe",
    email: "john.doe@university.edu",
    status: "active",
    grade: 12,
    verified: true,
  };

  const statusColor = student.status === "active" ? "#4caf50" : "#f44336";

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Student Profile" }} />
      <View style={styles.hero}>
        <Avatar.Text
          size={80}
          label={student.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          style={{ backgroundColor: "#6200ee" }}
        />
        <Text variant="headlineMedium" style={styles.name}>
          {student.name}
        </Text>
        <Chip
          icon="circle"
          selectedColor="white"
          style={{ backgroundColor: statusColor }}
        >
          {student.status.toUpperCase()}
        </Chip>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <DetailItem
            icon="email-outline"
            label="Email Address"
            value={student.email}
          />
          <Divider style={styles.divider} />
          <DetailItem
            icon="school-outline"
            label="Grade Level"
            value={`Grade ${student.grade}`}
          />
          <Divider style={styles.divider} />
          <DetailItem
            icon={student.verified ? "check-decagram" : "alert-circle-outline"}
            label="Verification Status"
            value={
              student.verified ? "Verified Account" : "Pending Verification"
            }
          />
        </Card.Content>
      </Card>
      <View style={styles.actions}>
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

function DetailItem({ icon, label, value }: AuxProps) {
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
