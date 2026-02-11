import { placeholderCourses } from "@/utils/placeholder_courses";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, IconButton, Menu, Divider } from "react-native-paper";

export default function CoursesTab() {
  const [visibleId, setVisibleId] = useState<string | null>(null);

  const openMenu = (id: string) => setVisibleId(id);
  const closeMenu = () => setVisibleId(null);

  const renderCourse = ({ item }: { item: any }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.title}
        subtitle={`${item.students} Students`}
        right={(props) => (
          <Menu
            visible={visibleId === item.id}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                {...props}
                icon="dots-vertical"
                onPress={() => openMenu(item.id)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                console.log("View ", item.id);
                closeMenu();
              }}
              title="View"
              leadingIcon="eye"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                console.log("Edit", item.id);
                closeMenu();
              }}
              title="Edit"
              leadingIcon="pencil"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                console.log("Delete", item.id);
                closeMenu();
              }}
              title="Delete"
              leadingIcon="delete"
              titleStyle={{ color: "red" }}
            />
          </Menu>
        )}
      />
    </Card>
  );

  return (
    <FlatList
      data={placeholderCourses}
      renderItem={renderCourse}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: { padding: 16 },
  card: { marginBottom: 12, backgroundColor: "white" },
});
