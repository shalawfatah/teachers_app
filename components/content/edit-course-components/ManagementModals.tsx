import React from "react";
import VideoFormModal from "@/components/content/VideoFormaModal";
import CreateCourseModal from "@/components/courses/CreateCourseModal";
import VideoPlayerModal from "@/components/content/VideoPlayerModal";

interface Props {
  state: any; // Using the object from useContentManagement
  onRefresh: () => void;
}

export default function ManagementModals({ state, onRefresh }: Props) {
  return (
    <>
      <VideoFormModal
        visible={state.videoModalVisible}
        video={state.selectedVideo}
        onDismiss={() => state.setVideoModalVisible(false)}
        onSuccess={() => {
          state.setVideoModalVisible(false);
          onRefresh();
        }}
      />
      <CreateCourseModal
        visible={state.courseModalVisible}
        onDismiss={() => state.setCourseModalVisible(false)}
        onSuccess={() => {
          state.setCourseModalVisible(false);
          onRefresh();
        }}
      />
      <VideoPlayerModal
        visible={state.playerVisible}
        video={state.selectedVideo}
        onDismiss={() => {
          state.setPlayerVisible(false);
          state.setSelectedVideo(null);
        }}
      />
    </>
  );
}
