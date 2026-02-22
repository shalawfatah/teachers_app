import { useState } from "react";
import { Button, Menu } from "react-native-paper";
import { styles } from "@/styles/video_form_modal_styles";

interface CourseDropdownProps {
  courseName: string;
  courses: { id: string; title: string }[];
  onSelect: (id: string, name: string) => void;
}

export function CourseDropdown({
  courseName,
  courses,
  onSelect,
}: CourseDropdownProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSelect = (id: string, title: string) => {
    onSelect(id, title);
    setMenuVisible(false);
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Button
          mode="outlined"
          onPress={() => setMenuVisible(true)}
          style={styles.dropdown}
        >
          {courseName}
        </Button>
      }
    >
      {courses.map((course) => (
        <Menu.Item
          key={course.id}
          onPress={() => handleSelect(course.id, course.title)}
          title={course.title}
        />
      ))}
    </Menu>
  );
}
