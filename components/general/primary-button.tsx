import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { style_vars } from "@/utils/style_vars";

interface PrimaryButtonProps {
  text: string;
  action: () => void;
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function PrimaryButton({
  text,
  action,
  icon,
  disabled,
  loading,
}: PrimaryButtonProps) {
  return (
    <View style={buttonStyles.btn_container}>
      <Button
        mode="contained"
        onPress={action}
        textColor="#000"
        style={buttonStyles.button}
        labelStyle={buttonStyles.label}
        contentStyle={buttonStyles.content}
        icon={icon}
        disabled={disabled || loading}
        loading={loading}
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
    backgroundColor: style_vars.PRIMARY_WHITE_BUTTON,
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
