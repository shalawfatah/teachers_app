import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import {
  Modal,
  Portal,
  TextInput,
  Button,
  Text,
  Menu,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/video_form_modal_styles";
import { VideoFormModalProps } from "@/types/modal";

export default function VideoFormModal({
  visible,
  video,
  onDismiss,
  onSuccess,
}: VideoFormModalProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("Select Course");

  const [courses, setCourses] = useState<any[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchCourses();
      if (video) {
        setTitle(video.title || "");
        setLink(video.link || "");
        setCourseId(video.course_id || "");
      } else {
        setTitle("");
        setLink("");
        setCourseId("");
        setCourseName("Select Course");
      }
    }
  }, [visible, video]);

  const fetchCourses = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("courses")
      .select("id, title")
      .eq("teacher_id", user?.id);

    if (data) {
      setCourses(data);
      // If editing, find and set the display name of the current course
      if (video) {
        const current = data.find((c) => c.id === video.course_id);
        if (current) setCourseName(current.title);
      }
    }
  };

  const handleSave = async () => {
    // 1. Check if we are blocked by validation
    if (!title || !link || !courseId) {
      Alert.alert(
        "Missing Fields",
        `Please fill: ${!title ? "Title " : ""}${!link ? "Link " : ""}${!courseId ? "Course" : ""}`,
      );
      return;
    }

    setLoading(true);

    const payload = {
      title,
      link,
      course_id: courseId,
      thumbnail: video?.thumbnail || "https://via.placeholder.com/150",
    };

    try {
      let result;
      if (video?.id) {
        // UPDATE
        console.log("Updating video:", video.id, payload);
        result = await supabase
          .from("videos")
          .update(payload)
          .eq("id", video.id);
      } else {
        // INSERT
        console.log("Inserting new video:", payload);
        result = await supabase.from("videos").insert([payload]);
      }

      if (result.error) {
        console.error("Supabase Error:", result.error);
        Alert.alert("Database Error", result.error.message);
      } else {
        console.log("Save successful!");
        onSuccess();
        onDismiss();
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    } finally {
      setLoading(true); // Should be false, typo fix below
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text variant="headlineSmall" style={styles.header}>
          {video ? "Edit Video" : "Upload Video"}
        </Text>

        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
        />
        <TextInput
          label="Link"
          value={link}
          onChangeText={setLink}
          mode="outlined"
        />

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
              onPress={() => {
                setCourseId(course.id);
                setCourseName(course.title);
                setMenuVisible(false);
              }}
              title={course.title}
            />
          ))}
        </Menu>

        <View style={styles.actions}>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="contained" onPress={handleSave} loading={loading}>
            {video ? "Update" : "Upload"}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
