import React from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, Divider } from "react-native-paper";
import { styles } from "@/styles/filter_modal_styles";
import { FilterModalProps } from "@/types/modal";
import { useFilterLogic } from "./filter-modal-components/useFilterLogic";
import GradeSelector from "./filter-modal-components/GradeSelector";

export default function FilterModal({
  visible,
  onDismiss,
  onApply,
  currentFilters,
}: FilterModalProps) {
  const {
    selectedGrades,
    gradeExpanded,
    setGradeExpanded,
    toggleGrade,
    handleApply,
    handleClear,
    handleCancel,
  } = useFilterLogic(currentFilters, onApply, onDismiss);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            فلتەری خولەکان
          </Text>
          <Button onPress={handleClear} mode="text" compact>
            سڕینەوە
          </Button>
        </View>
        <Divider />

        <ScrollView style={styles.content}>
          <GradeSelector
            selectedGrades={selectedGrades}
            expanded={gradeExpanded}
            onToggleExpand={() => setGradeExpanded(!gradeExpanded)}
            onToggleGrade={toggleGrade}
          />
        </ScrollView>

        <Divider />
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.actionButton}
          >
            پاشگەزبوونەوە
          </Button>
          <Button
            mode="contained"
            onPress={handleApply}
            style={styles.actionButton}
          >
            جێبەجێکردن ({selectedGrades.length})
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
