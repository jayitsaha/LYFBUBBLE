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
        marginTop: -63
      }}
    >
      
      
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.base,
            fontWeight: "bold",
            marginLeft: 80,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          LYFNOTIFICATIONS
        </Text>

        <TouchableOpacity
                        onPress={() => navigation.navigate("SignInScreen")}
                        // style={tw`absolute top-4 right--5 z-50 p-3`}
                        // style={{position: "absolute", top: 18, right: 3, padding: 3}}
        >
            <View
                style={{
                // position: "absolute",
                // left: 12,
                // top: 12,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 100,
                marginLeft: 15,
                padding: 3
                
                }}
            >
                <Image style={{
                    width: 26,
                    height: 26,
                    borderRadius: 4,
                    position: "absolute",
                    backgroundColor: "tranparent",
                    marginTop: 5,
                    marginLeft: 3
                }} 
                source={require('../assets/images/gold_coin.webp')} />
                
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#222", marginLeft: 20 }}>
                {300}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default NewsHeader;