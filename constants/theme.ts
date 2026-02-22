import { MD3LightTheme, configureFonts } from "react-native-paper";

const fontConfig = {
  fontFamily: "Goran",
};

export const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
};
