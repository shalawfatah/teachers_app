import { View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "@/styles/single_student_view_styles";

interface PrimaryButtonProps {
  text: string;
  action: () => void;
}

export default function SecondaryButton({ text, action }: PrimaryButtonProps) {
  return (
    <View style={styles.btn_container}>
      <Button
        mode="outlined"
        onPress={action}
        textColor="#000"
        style={styles.secondary_button}
        icon="trash-can-outline"
      >
        {text}
      </Button>
    </View>
  );
}
