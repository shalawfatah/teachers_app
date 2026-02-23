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
      <Menu.Item onPress={onView} title="بینین" leadingIcon="eye" />
      <Divider />
      <Menu.Item onPress={onEdit} title="نوێکردنەوە" leadingIcon="pencil" />
      <Divider />
      <Menu.Item
        onPress={onDelete}
        title="سڕینەوە"
        leadingIcon="delete"
        titleStyle={{ color: "red" }}
      />
    </Menu>
  );
}
