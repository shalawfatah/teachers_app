import { View } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "@/styles/single_student_view_styles";

interface PrimaryButtonProps {
  text: string;
  action: () => void;
  icon?: string;
}

export default function PrimaryButton({ text, action, icon}: PrimaryButtonProps) {
  return (
    <View style={styles.btn_container}>
      <Button
        onPress={action}
        textColor="#000"
        style={styles.button}
        icon={icon}
      >
        {text}
      </Button>
    </View>
  );
}
