import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Avatar, Card, Text, Divider, Button, Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuxProps, StudentProps } from "@/types/students";
import { styles } from "@/styles/single_student_view_styles";
import DeleteStudentModal from "@/components/teachers/account/DeleteStudentModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";
import PrimaryButton from "@/components/general/primary-button";
import { style_vars } from "@/utils/style_vars";

export default function ViewStudent() {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  const { height } = useWindowDimensions();

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
      <Stack.Screen options={{ title: text.student_profile }} />
      <LinearGradient
        colors={gradient_colors}
        style={[StyleSheet.absoluteFill, { flex: 1, height: height }]}
      />
      <BackgroundShapes />

      <View style={styles.hero}>
        <Avatar.Text
          size={80}
          label={student.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          style={{ backgroundColor: style_vars.PRIMARY_WHITE_BUTTON }}
        />
        <Text variant="headlineMedium" style={styles.name}>
          {student.name}
        </Text>
        <Chip
          icon="circle"
          selectedColor="white"
          style={{ backgroundColor: statusColor }}
        >
          {student.status === "active" ? text.verified : text.not_verified}
        </Chip>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <DetailItem
            icon="email-outline"
            label={text.email}
            value={student.email}
          />
          <Divider style={styles.divider} />
          <DetailItem
            icon="school-outline"
            label={text.class}
            value={`${text.class} ${student.grade}`}
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
      <PrimaryButton
        text={text.delete_student_account}
        icon={"trash-can"}
        action={() => setModalVisible(true)}
      />
      <DeleteStudentModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        studentId={student.id}
        studentName={student.name}
      />
    </ScrollView>
  );
}

function DetailItem({ icon, label, value }: AuxProps) {
  const { isRTL } = useLanguage();
  return (
    <View style={[styles.detailRow, { direction: isRTL ? "rtl" : "ltr" }]}>
      <MaterialCommunityIcons name={icon as any} size={24} color="#FFF" />
      <View style={styles.detailText}>
        <Text variant="labelMedium" style={{ color: "#FFF" }}>
          {label}
        </Text>
        <Text variant="bodyLarge" style={{ color: "#FFF" }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
