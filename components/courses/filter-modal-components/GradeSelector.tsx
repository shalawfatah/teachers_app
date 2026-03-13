import React from "react";
import { View } from "react-native";
import { List, Checkbox, Text } from "react-native-paper";
import { GRADES } from "@/utils/placeholder_grades";
import { styles } from "@/styles/filter_modal_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

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
  const {lang} = useLanguage()
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <List.Accordion
      title={text.course_relevant_class}
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
