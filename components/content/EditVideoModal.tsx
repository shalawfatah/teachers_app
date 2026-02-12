import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

export function EditVideoModal({ visible, video, onDismiss, onSuccess }: any) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Sync state when video changes
  useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setLink(video.link || "");
    }
  }, [video]);

  // 2. Guard against null video during the save process
  const handleUpdate = async () => {
    if (!video?.id) return; // Guard clause

    setLoading(true);
    const { error } = await supabase
      .from("videos")
      .update({ title, link })
      .eq("id", video.id);

    setLoading(false);
    if (!error) {
      onSuccess();
      onDismiss();
    }
  };

  // 3. Render Guard: If not visible or no video, return null
  // This prevents the "Cannot read property id of null" error
  if (!visible || !video) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalStyle}
      >
        <Text variant="headlineSmall">Edit Video</Text>
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
        <Button mode="contained" onPress={handleUpdate} loading={loading}>
          Save
        </Button>
      </Modal>
    </Portal>
  );
}
