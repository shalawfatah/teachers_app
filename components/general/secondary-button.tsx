import { StyleSheet, View, ViewStyle } from "react-native";
import { Button } from "react-native-paper";
import { style_vars } from "@/utils/style_vars";

interface SecondaryButtonProps {
  text: string;
  action: () => void;
  icon?: string;
  loading?: boolean;
  disabled?: boolean; 
  style?: ViewStyle; 
}

export default function SecondaryButton({
  text,
  action,
  icon,
  loading = false, 
  disabled = false, 
  style,
}: SecondaryButtonProps) {
  return (
    <View style={[buttonStyles.btn_container, style]}>
      <Button
        mode="outlined"
        onPress={action}
        textColor="#000"
        style={[
          buttonStyles.button,
          disabled && { opacity: 0.6 },
        ]}
        icon={icon}
        loading={loading} 
        disabled={disabled || loading} 
      >
        {text}
      </Button>
    </View>
  );
}

const buttonStyles = StyleSheet.create({
  btn_container: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    marginVertical: 12,
    borderRadius: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  content: {
    width: "100%",
    height: 50,
  },
  label: {
    fontFamily: style_vars.PRIMARY_FONT,
  },
});
