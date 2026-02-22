import React from "react";
import { View } from "react-native";
import { List, Checkbox, Text } from "react-native-paper";
import { GRADES } from "@/utils/placeholder_grades";
import { styles } from "@/styles/filter_modal_styles";

interface Props {
  selectedGrades: string[];
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleGrade: (grade: string) => void;
}

export default function GradeSelector({
  selectedGrades,
  expanded,
  onToggleExpand,
  onToggleGrade,
}: Props) {
  return (
    <List.Accordion
      title="خولەکە تایبەت بە چ پۆلێکە"
      titleStyle={styles.accordionTitle}
      expanded={expanded}
      onPress={onToggleExpand}
      left={(props) => <List.Icon {...props} icon="school" />}
      right={(p) => (
        <View style={styles.accordionRight}>
          {selectedGrades.length > 0 && (
            <Text variant="bodySmall" style={styles.selectedCount}>
              {selectedGrades.length} selected
            </Text>
          )}
          <List.Icon {...p} icon={expanded ? "chevron-up" : "chevron-down"} />
        </View>
      )}
      style={styles.accordion}
    >
      {GRADES.map((grade) => (
        <List.Item
          key={grade}
          title={grade}
          onPress={() => onToggleGrade(grade)}
          left={() => (
            <Checkbox
              status={selectedGrades.includes(grade) ? "checked" : "unchecked"}
            />
          )}
          style={styles.listItem}
        />
      ))}
    </List.Accordion>
  );
}
