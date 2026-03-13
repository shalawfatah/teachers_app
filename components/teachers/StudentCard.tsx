import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Avatar, IconButton, Menu, Chip } from "react-native-paper";
import { StudentCardProps } from "@/types/students";
import { styles } from "@/styles/teacher_students_styles";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StudentCard({
  student,
  onView,
  onEdit,
  onDelete,
}: StudentCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { lang, t } = useLanguage();
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleView = () => {
    closeMenu();
    onView?.(student.id);
  };

  const handleEdit = () => {
    closeMenu();
    onEdit?.(student.id);
  };

  const handleDelete = () => {
    closeMenu();
    onDelete?.(student.id);
  };

  const general = lang === 1 ? t.general_eng : t.general_krd;

  return (
    <Card style={styles.studentCard}>
      <Card.Content>
        <View style={styles.studentRow}>
          <View style={styles.studentInfo}>
            <Avatar.Text
              size={50}
              label={student.name.charAt(0)}
              style={styles.avatar}
            />
            <View style={styles.studentDetails}>
              <Text variant="titleMedium" style={styles.studentName}>
                {student.name}
              </Text>
              <Text variant="bodySmall" style={styles.studentEmail}>
                {student.email}
              </Text>
              <View style={styles.studentMeta}>
                <Chip icon="book-open" compact style={styles.courseChip}>
                  {student.verified ? "Verified" : "Not Verified"}
                </Chip>
              </View>
            </View>
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton icon="dots-vertical" size={24} onPress={openMenu} />
            }
          >
            <Menu.Item
              onPress={handleView}
              title={general.view}
              leadingIcon="eye"
            />
            <Menu.Item
              onPress={handleEdit}
              title={general.update}
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={handleDelete}
              title={general.delete}
              leadingIcon="delete"
            />
          </Menu>
        </View>
      </Card.Content>
    </Card>
  );
}
