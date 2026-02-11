import { FlatList, StyleSheet } from "react-native";
import { Card, Badge, IconButton } from "react-native-paper";

const placeholderCourses = [
  {
    id: "1",
    title: "React Native Masterclass",
    students: 120,
    lessons: 24,
    status: "published",
  },
  {
    id: "2",
    title: "Supabase for Beginners",
    students: 85,
    lessons: 10,
    status: "draft",
  },
];

export default function CoursesTab() {
  return (
    <FlatList
      data={placeholderCourses}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <Card style={styles.card} onPress={() => console.log("View Course")}>
          <Card.Title
            title={item.title}
            subtitle={`${item.students} Students • ${item.lessons} Lessons`}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => { }} />
            )}
          />
          <Card.Content>
            <Badge
              style={{
                backgroundColor:
                  item.status === "published" ? "#4caf50" : "#fb8c00",
              }}
            >
              {item.status.toUpperCase()}
            </Badge>
          </Card.Content>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 100 },
  card: { marginBottom: 12, backgroundColor: "white" },
});
