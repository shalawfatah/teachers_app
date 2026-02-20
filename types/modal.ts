import { Student, Teacher } from "./profile";

export interface EditProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  profile: Teacher | null;
  onProfileUpdate: () => void;
}

export interface UploadVideoModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSuccess: () => void;
}

export interface VideoFormModalProps {
  visible: boolean;
  video: any | null;
  onDismiss: () => void;
  onSuccess: () => void;
}

export interface VideoPlayerModalProps {
  visible: boolean;
  video: { link: string; video_hls_url?: string } | null; // Added hls field to type
  onDismiss: () => void;
}

export interface CreateCourseModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSuccess: () => void;
}

export interface FilterModalProps {
  visible: boolean;
  onDismiss: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  grades: string[];
}

export interface EditStudentModalProps {
  visible: boolean;
  onDismiss: () => void;
  profile: Student | null;
  onProfileUpdate: () => void;
}

export type SettingsType =
  | "privacy"
  | "help"
  | "about"
  | null;

export interface SettingsModalProps {
  type: SettingsType;
  visible: boolean;
  onDismiss: () => void;
}
