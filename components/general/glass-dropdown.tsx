import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from "react-native";
import { Text, IconButton } from "react-native-paper";
import { BlurView } from "expo-blur";
import { style_vars } from "@/utils/style_vars";

interface DropdownOption {
  value: string | number;
  label: string;
}

interface GlassDropdownProps {
  label: string;
  value: string | number;
  options: DropdownOption[];
  onSelect: (value: any) => void;
  isRTL?: boolean;
  style?: ViewStyle;
}

export default function GlassDropdown({
  label,
  value,
  options,
  onSelect,
  isRTL = false,
  style,
}: GlassDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Find the label for the currently selected value
  const currentLabel = options.find((o) => o.value === value)?.label || label;

  return (
    <View style={[styles.container, style]}>
      {/* Field Label */}
      <Text
        variant="bodyMedium"
        style={[styles.fieldLabel, { textAlign: isRTL ? "right" : "left" }]}
      >
        {label}
      </Text>

      {/* Trigger Button */}
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <View
          style={[
            styles.trigger,
            { flexDirection: isRTL ? "row-reverse" : "row" },
          ]}
        >
          <Text style={styles.triggerText}>{currentLabel}</Text>
          <IconButton
            icon={isOpen ? "chevron-up" : "chevron-down"}
            iconColor="#fff"
            size={20}
            style={{ margin: 0 }}
          />
        </View>
      </Pressable>

      {/* Options List */}
      {isOpen && (
        <BlurView intensity={30} tint="light" style={styles.optionsWrapper}>
          <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true}>
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <Pressable
                  key={option.value.toString()}
                  onPress={() => {
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.optionItem,
                    {
                      flexDirection: isRTL ? "row-reverse" : "row",
                      backgroundColor: pressed
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { textAlign: isRTL ? "right" : "left" },
                    ]}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <IconButton
                      icon="check"
                      iconColor="#4ade80"
                      size={18}
                      style={{ margin: 0 }}
                    />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  fieldLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: style_vars.PRIMARY_FONT,
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  trigger: {
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  triggerText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: style_vars.PRIMARY_FONT,
  },
  optionsWrapper: {
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
  },
  optionItem: {
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  optionText: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
  },
});
