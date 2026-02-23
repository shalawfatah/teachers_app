import React from "react";
import { View } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { styles } from "@/styles/teacher_students_styles";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function StudentHeader({ searchQuery, onSearchChange }: Props) {
  return (
    <>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          خوێندکاران
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          بەڕێوەبردنی خوێندکاران
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="گەڕان"
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>
    </>
  );
}
