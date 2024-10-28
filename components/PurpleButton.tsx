import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {Colors} from "../constants/Colors";
import { fonts } from "../globalFont";


export default function PurpleButton({
  enabled = true,
  onPress,
  text,
  isLoading = false,
  style,
}: {
  enabled?: boolean;
  onPress: () => void;
  text: string;
  isLoading?: boolean;
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!enabled || isLoading}>
      <View
        style={[
          styles.button,
          isLoading || !enabled ? { opacity: 0.4 } : { opacity: 1 },
          style,
        ]}
      >
        {isLoading && <ActivityIndicator color="white" size="small" />}
        <Text style={[{ color: "#222", textAlign: "center" }, fonts.Title1]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
    borderRadius: 25,
    minHeight: 45,
    // gap: 12,
    backgroundColor: '#FCF09A',
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
});