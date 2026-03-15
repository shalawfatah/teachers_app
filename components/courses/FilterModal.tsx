import React from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, Divider } from "react-native-paper";
import { styles } from "@/styles/filter_modal_styles";
import { FilterModalProps } from "@/types/modal";
import { useFilterLogic } from "./filter-modal-components/useFilterLogic";
import GradeSelector from "./filter-modal-components/GradeSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

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
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={[
          styles.modalContainer,
          { direction: isRTL ? "rtl" : "ltr" },
        ]}
      >
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            {text.filter_courses}
          </Text>
          <Button onPress={handleClear} mode="text" compact>
            {text.delete}
          </Button>
        </View>
        <Divider />

        <ScrollView style={styles.content}>
          <GradeSelector
            selectedGrades={selectedGrades}
            expanded={gradeExpanded}
            onToggleExpand={() => setGradeExpanded(!gradeExpanded)}
            onToggleGrade={toggleGrade}
            lang={lang}
          />
        </ScrollView>

        <Divider />
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.actionButton}
          >
            {text.cancel}
          </Button>
          <Button
            mode="contained"
            onPress={handleApply}
            style={styles.actionButton}
          >
            {text.apply} ({selectedGrades.length})
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
