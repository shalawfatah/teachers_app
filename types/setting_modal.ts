export type SettingsType = "help" | "about" | null;

export interface SettingsModalProps {
  type: SettingsType;
  visible: boolean;
  onDismiss: () => void;
}

export interface AccountSettingListProps {
  onEditPress: () => void;
  onSettingsPress: (type: "help" | "about") => void;
}
