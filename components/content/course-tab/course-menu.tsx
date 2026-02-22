import { IconButton, Menu, Divider } from "react-native-paper";

interface CourseMenuProps {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CourseMenu({
  visible,
  onOpen,
  onClose,
  onView,
  onEdit,
  onDelete,
  ...iconProps
}: CourseMenuProps & any) {
  return (
    <Menu
      visible={visible}
      onDismiss={onClose}
      anchor={
        <IconButton {...iconProps} icon="dots-vertical" onPress={onOpen} />
      }
    >
      <Menu.Item onPress={onView} title="View" leadingIcon="eye" />
      <Divider />
      <Menu.Item onPress={onEdit} title="Edit" leadingIcon="pencil" />
      <Divider />
      <Menu.Item
        onPress={onDelete}
        title="Delete"
        leadingIcon="delete"
        titleStyle={{ color: "red" }}
      />
    </Menu>
  );
}
