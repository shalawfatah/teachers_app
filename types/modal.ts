import { Teacher } from "./profile";

export interface EditProfileModalProps {
  visible: boolean;
  onDismiss: () => void;
  profile: Teacher | null;
  onProfileUpdate: () => void;
}
