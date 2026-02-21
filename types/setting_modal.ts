export type SettingsType =
  | "help"
  | "about"
  | null;

export interface SettingsModalProps {
  type: SettingsType;
  visible: boolean;
  onDismiss: () => void;
}
