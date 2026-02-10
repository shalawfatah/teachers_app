import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  Card,
  Searchbar,
  ActivityIndicator,
  Avatar,
  IconButton,
  Menu,
  Chip,
} from "react-native-paper";
import { useState, useEffect } from "react";

interface Student {
  id: string;
  full_name: string;
  email: string;
  enrolled_courses: number;
  last_active: string;
  status: "active" | "inactive";
}

export default function StudentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const placeholderStudents = [
    {
      id: "1",
      full_name: "Sarah Johnson",
      email: "sarah.j@email.com",
      enrolled_courses: 5,
      last_active: "2024-02-10",
      status: "active" as const,
    },
    {
      id: "2",
      full_name: "Michael Chen",
      email: "michael.c@email.com",
      enrolled_courses: 3,
      last_active: "2024-02-09",
      status: "active" as const,
    },
    {
      id: "3",
      full_name: "Emily Davis",
      email: "emily.d@email.com",
      enrolled_courses: 8,
      last_active: "2024-01-25",
      status: "inactive" as const,
    },
    {
      id: "4",
      full_name: "James Wilson",
      email: "james.w@email.com",
      enrolled_courses: 2,
      last_active: "2024-02-10",
      status: "active" as const,
    },
  ];

  const openMenu = (studentId: string) => setMenuVisible(studentId);
  const closeMenu = () => setMenuVisible(null);

  const handleView = (studentId: string) => {
    closeMenu();
    console.log("View student:", studentId);
  };

  const handleEdit = (studentId: string) => {
    closeMenu();
    console.log("Edit student:", studentId);
  };

  const handleDelete = (studentId: string) => {
    closeMenu();
    console.log("Delete student:", studentId);
  };

  const renderStudent = ({ item }: { item: Student }) => (
    <Card style={styles.studentCard}>
      <Card.Content>
        <View style={styles.studentRow}>
          <View style={styles.studentInfo}>
            <Avatar.Text
              size={50}
              label={item.full_name.charAt(0)}
              style={styles.avatar}
            />
            <View style={styles.studentDetails}>
              <Text variant="titleMedium" style={styles.studentName}>
                {item.full_name}
              </Text>
              <Text variant="bodySmall" style={styles.studentEmail}>
                {item.email}
              </Text>
              <View style={styles.studentMeta}>
                <Chip
                  icon="book-open"
                  compact
                  style={styles.courseChip}
                  textStyle={styles.chipText}
                >
                  {item.enrolled_courses} courses
                </Chip>
                <Chip
                  compact
                  style={[
                    styles.statusChip,
                    item.status === "active"
                      ? styles.activeChip
                      : styles.inactiveChip,
                  ]}
                  textStyle={styles.chipText}
                >
                  {item.status}
                </Chip>
              </View>
            </View>
          </View>
          <Menu
            visible={menuVisible === item.id}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={24}
                onPress={() => openMenu(item.id)}
              />
            }
          >
            <Menu.Item
              onPress={() => handleView(item.id)}
              title="View Details"
              leadingIcon="eye"
            />
            <Menu.Item
              onPress={() => handleEdit(item.id)}
              title="Edit"
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={() => handleDelete(item.id)}
              title="Remove"
              leadingIcon="delete"
            />
          </Menu>
        </View>
        <Text variant="bodySmall" style={styles.lastActive}>
          Last active: {new Date(item.last_active).toLocaleDateString()}
        </Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Students
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Manage your enrolled students
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              1,247
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Total Students
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              1,198
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Active
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text variant="headlineSmall" style={styles.statNumber}>
              49
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Inactive
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search students..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      {/* Students List */}
      <FlatList
        data={placeholderStudents}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  statLabel: {
    color: "#666",
    marginTop: 4,
  },
  searchContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  studentCard: {
    marginBottom: 12,
    elevation: 2,
  },
  studentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  studentInfo: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  avatar: {
    backgroundColor: "#6200ee",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  studentEmail: {
    color: "#666",
    marginBottom: 8,
  },
  studentMeta: {
    flexDirection: "row",
    gap: 8,
  },
  courseChip: {
    alignSelf: "flex-start",
    height: 24,
  },
  statusChip: {
    alignSelf: "flex-start",
    height: 24,
  },
  activeChip: {
    backgroundColor: "#4caf50",
  },
  inactiveChip: {
    backgroundColor: "#9e9e9e",
  },
  chipText: {
    fontSize: 11,
  },
  lastActive: {
    color: "#999",
    marginTop: 8,
  },
});
