import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

export function EditVideoModal({ visible, video, onDismiss, onSuccess }: any) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setLink(video.link || "");
    }
  }, [video]);

  const handleUpdate = async () => {
    if (!video?.id) return;

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

  if (!visible || !video) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
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
