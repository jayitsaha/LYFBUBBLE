import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { Categories } from "../data";
import useColors from "../hooks/useColors";
import { useNavigation } from "@react-navigation/native";


const NewsHeader= () => {
  const { goBack } = useNavigation();
  const colors = useColors();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.padding.base,
        marginTop: 20,
        marginBottom: 50
      }}
    >
      
      
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.base,
            fontWeight: "bold",
            marginLeft: 85,
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          LYFSEC NOTIFICATIONS
        </Text>

        
    </View>
  );
};

export default NewsHeader;