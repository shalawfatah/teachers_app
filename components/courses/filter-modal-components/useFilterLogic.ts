import { useState } from "react";
import { FilterModalProps } from "@/types/modal";

export const useFilterLogic = (
  currentFilters: FilterModalProps["currentFilters"],
  onApply: FilterModalProps["onApply"],
  onDismiss: () => void,
) => {
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

  const handleClear = () => setSelectedGrades([]);

  const handleCancel = () => {
    setSelectedGrades(currentFilters.grades);
    onDismiss();
  };

  return {
    selectedGrades,
    gradeExpanded,
    setGradeExpanded,
    toggleGrade,
    handleApply,
    handleClear,
    handleCancel,
  };
};
