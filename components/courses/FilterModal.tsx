import { View, StyleSheet, ScrollView } from "react-native";
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

interface FilterModalProps {
  visible: boolean;
  onDismiss: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  grades: string[];
}

const GRADES = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

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
          {/* Grade Level Accordion */}
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

          {/* Future filter sections can be added here as more accordions */}
          {/* Example:
          <List.Accordion
            title="Subject"
            expanded={subjectExpanded}
            onPress={() => setSubjectExpanded(!subjectExpanded)}
            left={props => <List.Icon {...props} icon="book" />}
          >
            ...
          </List.Accordion>
          */}
        </ScrollView>

        <Divider />

        {/* Action Buttons */}
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

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 12,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    maxHeight: 450,
  },
  accordion: {
    backgroundColor: "#fff",
  },
  accordionTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  accordionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  selectedCount: {
    color: "#6200ee",
    fontWeight: "500",
  },
  listItem: {
    paddingLeft: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
