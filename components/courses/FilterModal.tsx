import { View, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  Divider,
  List,
  Checkbox,
} from "react-native-paper";
import { useState } from "react";
import { GRADES } from "@/utils/placeholder_grades";
import { styles } from "@/styles/filter_modal_styles";
import { FilterModalProps } from "@/types/modal";

export default function FilterModal({
  visible,
  onDismiss,
  onApply,
  currentFilters,
}: FilterModalProps) {
  const [selectedGrades, setSelectedGrades] = useState<string[]>(
    currentFilters.grades,
  );
  const [gradeExpanded, setGradeExpanded] = useState(true);

  const toggleGrade = (grade: string) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade],
    );
  };

  const handleApply = () => {
    onApply({ grades: selectedGrades });
    onDismiss();
  };

  const handleClear = () => {
    setSelectedGrades([]);
  };

  const handleCancel = () => {
    setSelectedGrades(currentFilters.grades);
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleCancel}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            Filter Courses
          </Text>
          <Button onPress={handleClear} mode="text" compact>
            Clear All
          </Button>
        </View>

        <Divider />

        <ScrollView style={styles.content}>
          <List.Accordion
            title="Grade Level"
            titleStyle={styles.accordionTitle}
            expanded={gradeExpanded}
            onPress={() => setGradeExpanded(!gradeExpanded)}
            left={(props) => <List.Icon {...props} icon="school" />}
            right={(props) =>
              selectedGrades.length > 0 ? (
                <View style={styles.accordionRight}>
                  <Text variant="bodySmall" style={styles.selectedCount}>
                    {selectedGrades.length} selected
                  </Text>
                  <List.Icon
                    {...props}
                    icon={gradeExpanded ? "chevron-up" : "chevron-down"}
                  />
                </View>
              ) : (
                <List.Icon
                  {...props}
                  icon={gradeExpanded ? "chevron-up" : "chevron-down"}
                />
              )
            }
            style={styles.accordion}
          >
            {GRADES.map((grade) => (
              <List.Item
                key={grade}
                title={grade}
                onPress={() => toggleGrade(grade)}
                left={() => (
                  <Checkbox
                    status={
                      selectedGrades.includes(grade) ? "checked" : "unchecked"
                    }
                    onPress={() => toggleGrade(grade)}
                  />
                )}
                style={styles.listItem}
              />
            ))}
          </List.Accordion>
        </ScrollView>

        <Divider />

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.actionButton}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleApply}
            style={styles.actionButton}
          >
            Apply ({selectedGrades.length})
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
