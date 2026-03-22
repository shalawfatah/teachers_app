import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import { style_vars } from "@/utils/style_vars";

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
    <View>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        // 1. THE GLASS WINDOW STYLE
        contentStyle={dropdownStyles.menuWindow}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={dropdownStyles.anchorButton}
            textColor="#FFF"
            icon="chevron-down"
            contentStyle={{ height: 50, flexDirection: "row-reverse" }}
            labelStyle={dropdownStyles.buttonLabel}
          >
            {courseName || "Select Course"}
          </Button>
        }
      >
        {courses.map((course, index) => (
          <View key={course.id}>
            <Menu.Item
              onPress={() => handleSelect(course.id, course.title)}
              title={course.title}
              titleStyle={dropdownStyles.itemText}
              rippleColor="rgba(255,255,255,0.1)"
            />
            {/* Add a subtle divider between courses except the last one */}
            {index < courses.length - 1 && (
              <Divider style={dropdownStyles.divider} />
            )}
          </View>
        ))}
      </Menu>
    </View>
  );
}

const dropdownStyles = StyleSheet.create({
  anchorButton: {
    borderRadius: 12,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    marginTop: 8,
  },
  buttonLabel: {
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 14,
    textAlign: "left",
  },
  menuWindow: {
    backgroundColor: "rgba(35, 35, 35, 0.98)", // Deep dark glass
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    marginTop: 55, // Offset so it doesn't cover the button
    elevation: 10,
  },
  itemText: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: style_vars.PRIMARY_FONT,
  },
  divider: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginHorizontal: 12,
  },
});
