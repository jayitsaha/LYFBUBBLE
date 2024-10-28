import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from "reanimated-masonry-list";
// import { BlurView } from "expo-blur";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";
import { TabsStackScreenProps } from "../navigators/TabsNavigator";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import RootNavigator from "./src/navigators/RootNavigator";
import { useMemo } from "react";
import "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const CATEGORIES = [
  "Stay",
  "Coffee",
  "Food",
  "Accessories",
  "Groceries",
  "Furnitures",
  "Beauty",
];

const AVATAR_URL =
  "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

const MESONARY_LIST_DATA = [

  {
    imageUrl:
      "https://res.cloudinary.com/dyfmlusbc/image/upload/v1730126827/7_zxd7at.jpg",
    title: "PUMA Everyday Hussle",
    price: 300,
  },

  {
    imageUrl:
      "https://res.cloudinary.com/dyfmlusbc/image/upload/v1730143737/2_lkf3so.jpg",
    title: "PUMA Everyday Hussle",
    price: 1200,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dyfmlusbc/image/upload/v1730143749/1_gtx83p.jpg",
    title: "PUMA Everyday Hussle",
    price: 800,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dyfmlusbc/image/upload/v1730126828/5_w4jgeq.jpg",
    title: "PUMA Everyday Hussle",
    price: 2000,
  },
  
  
  {
    imageUrl:
      "https://res.cloudinary.com/dyfmlusbc/image/upload/v1730128460/Interior_Design_Brand_Narrative_and_Promotion_Business_Instagram_Reel_in_Yellow_Green_Black_Elegant_Serif_Style_fnnv3k.jpg",
    title: "PUMA Everyday Hussle",
    price: 2400,
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dyfmlusbc/image/upload/v1730143749/4_nrrqp8.jpg",
    title: "PUMA Everyday Hussle",
    price: 1500,
  },
 


  {
    imageUrl:
      "https://res.cloudinary.com/dyfmlusbc/image/upload/v1730143743/8_jfgffl.jpg",
    title: "PUMA Everyday Hussle",
    price: 2000,
  },

  {
    imageUrl:
      "https://res.cloudinary.com/dyfmlusbc/image/upload/v1730126843/3_vzf79b.jpg",
    title: "PUMA Everyday Hussle",
    price: 3000,
  },

  

  


  
];

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // const openFilterModal = useCallback(() => {
  //   bottomSheetModalRef.current?.present();
  // }, []);

  const colorScheme = useColorScheme();




  return (

    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={styles.container}>
        
          
    <ScrollView style={{paddingHorizontal: -12}}>
      <SafeAreaView style={{ paddingVertical: 24, marginHorizontal: 12, paddingHorizontal: -4 }}>
        {/* Header Section */}
        

        {/* Search Bar Section */}
        <View style={{ flexDirection: "row", paddingHorizontal: -12, marginHorizontal: 6, marginBottom: 15 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 52,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: "#D9D9D9",
              alignItems: "center",
              paddingHorizontal: 24,
              flexDirection: "row",
              marginHorizontal: 6,
            }}
          >
            <Icons
              name="search"
              size={24}
              color={"#191919"}
              style={{ opacity: 0.5 }}
            />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: "#191919",
                opacity: 0.5,
              }}
            >
              lyfMart - A Rewards Market
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              backgroundColor: "#191919",
            }}
          >
            <Icons name="tune" size={24} color={"#f5f5f5"} />
          </TouchableOpacity>
        </View>

        {/* Grid Collection View */}
        {/* <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: "#191919" }}
            >
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "#191919" }}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", height: 200, marginHorizontal: -12, paddingHorizontal: -12 }}>
            <CardTop
              onPress={() => {
                navigation.navigate("Details", {
                  id: "123",
                });
              }}
              price={130}
              imageUrl="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            />
            <View style={{ flex: 1, marginHorizontal: 12, paddingHorizontal: -24, justifyContent: "space-between" }}>
              <CardTop
                onPress={() => {
                  navigation.navigate("Details", {
                    id: "456",
                  });
                }}
                price={120}
                imageUrl="https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              />
              <CardTop
                onPress={() => {
                  navigation.navigate("Details", {
                    id: "789",
                  });
                }}
                price={170}
                imageUrl="https://images.unsplash.com/photo-1485218126466-34e6392ec754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80"
              />
            </View>
          </View>
        </View> */}

        {/* Categories Section */}
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            marginHorizontal: -6,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  backgroundColor: isSelected ? "#191919" : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: "#D9D9D9",
                  marginTop: 15,
                  marginBottom: 25,
                  marginLeft: 10
                }}
              >
                <Text
                  style={{
                    color: isSelected ? "#f5f5f5" : "#191919",
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Mesonary */}
        <MasonryList
          data={MESONARY_LIST_DATA}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: any) => (
            <TouchableOpacity
            onPress={() => navigation.navigate("SpinningWheel")}>
            <View style={{ padding: 6 }}>
              <View
                style={{
                  aspectRatio: i === 0 ? 2/3 : 2 / 3,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 24,
                }}

                
                
              >
                <Image
                  source={{
                    uri: item.imageUrl,
                  }}
                  resizeMode="cover"
                  style={StyleSheet.absoluteFill}
                />
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      padding: 12,
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row", marginHorizontal: 4, marginVertical: -4,  padding: 4 }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#fff",
                        textShadowColor: "rgba(0,0,0,0.2)",
                        textShadowOffset: {
                          height: 1,
                          width: 0,
                        },
                        textShadowRadius: 4,
                      }}
                    >
                      {/* {item.title} */}
                    </Text>
                    <View
                      style={{
                        backgroundColor: colors.card,
                        borderRadius: 100,
                        height: 32,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icons
                        name="favorite-border"
                        size={20}
                        color={"#191919"}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "rgba(0,0,0,0.3)",
                      alignItems: "center",
                      padding: 6,
                      borderRadius: 100,
                      overflow: "hidden",
                    }}
                    intensity={20}
                  >
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#fff",
                        marginLeft: 8,
                        textAlign: "center"
                      }}
                      numberOfLines={1}
                    >
                      {item.price}
                    </Text>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        borderRadius: 100,
                        // backgroundColor: "#fff",
                      }}
                    >
                      {/* <Icons name="add-shopping-cart" size={18} color="#000" /> */}
                      <Image style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        position: "absolute",
                        backgroundColor: "tranparent",
                        marginTop: 2.4,
                        marginLeft: -24
                    }} 
                    source={require('../../assets/images/gold_coin.webp')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>

      
    </ScrollView>

    <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const Card = ({
  price,
  imageUrl,
  onPress,
}: {
  price: number;
  imageUrl: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


const CardTop = ({
  price,
  imageUrl,
  onPress,
}: {
  price: number;
  imageUrl: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        marginBottom: 10
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});