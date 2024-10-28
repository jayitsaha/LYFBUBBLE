import React, { useState, useEffect, useRef } from "react";

import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Icon1 from '@expo/vector-icons/Ionicons'
import { Button } from "react-native-paper";
import { SafeAreaView, Modal, Image, ScrollView } from "react-native";


const { width: screenWidth } = Dimensions.get("window");

// import { useApiClient } from "../api/ApiClientProvider";
// import { NegotiationModal } from "../components/chat/NegotiationModal";
import PurpleButton from "../components/PurpleButton";
// import Layout from "../constants/Layout";
import { fonts } from "../globalFont";
// import { getUserId } from "../utils/asychStorageFunctions";
// import { makeToast } from "../utils/Toast";

export default function NewRequestScreen({ navigation, route }) {
//   const api = useApiClient();

  const [title, setTitle] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [minAmt, setMinAmt] = useState("");
  const [maxAmt, setMaxAmt] = useState("");

  const [description, setDescription] = useState("");
  const [minModalVisible, setMinModalVisible] = useState(false);
  const [maxModalVisible, setMaxModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState("");

  const [image, setImage] = useState(null);
  const [camera, setShowCamera] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);

  const [uploadScreen, setUploadScreen] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);






//   getUserId(setUserId);

  const postRequest = async () => {
    try {
      
    } catch (e: unknown) {}
  };

  return (
    <TouchableWithoutFeedback style={{marginTop: 100}} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: "#ffffff",
          height: "100%",
          flexDirection: "column",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{marginTop: 40}}>
          <Text
            style={[
              fonts.Title1,
              { marginStart: 32, marginBottom: 8, height: 26 },
            ]}
          >
            Title
          </Text>
          <View>
            <TextInput
              style={[
                fonts.body2,
                {
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingHorizontal: 15,
                  backgroundColor: "#F4F4F4",
                  borderRadius: 10,
                  height: 40,
                  marginHorizontal: 24,
                  marginBottom: 32,
                },
              ]}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
            {title.length > 0 && (
              <Text style={styles.lengthLimit}>{title.length}/50</Text>
            )}
          </View>
          <Text
            style={[
              fonts.Title1,
              { marginStart: 32, marginBottom: 10, height: 26 },
            ]}
          >
            Price Range
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "flex-start",
              marginBottom: 24,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{ marginHorizontal: 24, width: "35%" }}
              onPress={() => setMinModalVisible(true)}
            >
              <View
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingHorizontal: 15,
                  width: "100%",
                  height: 40,
                  backgroundColor: "#F4F4F4",
                  borderRadius: 10,
                }}
              >
                
                <Text
                  style={[
                    fonts.body2,
                    {
                      color: "#707070",
                    },
                  ]}
                >
                  {min == "" ? "$" : min}
                </Text>


                <TextInput
                    keyboardType='numeric'
                    style={[
                        fonts.body2,
                        {
                        width: "75%",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingHorizontal: 15,
                        // backgroundColor: "#F4F4F4",
                        borderRadius: 10,
                        height: 40,
                        marginHorizontal: 24,
                        marginBottom: 32,
                        position: "absolute",
                        right: 16
                        },
                    ]}
                    value={minAmt}
                    onChangeText={(text) => {
                        setMinAmt(text);
                    }}
                />

                

                <Text
                  style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 14,
                    position: "absolute",
                    right: 16,
                    bottom: 7,
                  }}
                >
                  min
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Rubik-Medium",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 18,
                lineHeight: 21,
                alignSelf: "center",
              }}
            >
              -
            </Text>
            <TouchableOpacity
              style={{ marginHorizontal: 24, width: "35%" }}
              onPress={() => setMaxModalVisible(true)}
            >
              <View
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  paddingHorizontal: 15,
                  width: "100%",
                  height: 40,
                  backgroundColor: "#F4F4F4",
                  borderRadius: 10,
                }}
              >
                
                <Text
                  style={[
                    fonts.body2,
                    {
                      color: "#707070",
                    },
                  ]}
                >
                  {max == "" ? "$" : max}
                </Text>

                <TextInput
                    keyboardType='numeric'
                    style={[
                        fonts.body2,
                        {
                        width: "75%",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingHorizontal: 15,
                        // backgroundColor: "#F4F4F4",
                        borderRadius: 10,
                        height: 40,
                        marginHorizontal: 24,
                        marginBottom: 32,
                        position: "absolute",
                        right: 16
                        },
                    ]}
                    value={maxAmt}
                    onChangeText={(text) => {
                        setMaxAmt(text);
                    }}
                />
                <Text
                  style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 14,
                    position: "absolute",
                    right: 16,
                    bottom: 7,
                  }}
                >
                  max
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <NegotiationModal
            modalVisible={minModalVisible}
            setModalVisible={setMinModalVisible}
            text={min}
            setText={setMin}
            screen={"NewRequestMin"}
            post={null}
            setHeight={null}
            items={null}
          /> */}
          {/* <NegotiationModal
            modalVisible={maxModalVisible}
            setModalVisible={setMaxModalVisible}
            text={max}
            setText={setMax}
            screen={"NewRequestMax"}
            post={null}
            setHeight={null}
            items={null}
          /> */}
          <Text
            style={[
              fonts.Title1,
              { marginStart: 32, marginBottom: 8, height: 26 },
            ]}
          >
            Item Description
          </Text>
          <TextInput
            style={[
              fonts.body2,
              {
                paddingTop: 12,
                paddingBottom: 12,
                paddingHorizontal: 15,
                backgroundColor: "#F4F4F4",
                borderRadius: 10,
                marginHorizontal: 24,
                marginBottom: 32,
                minHeight: 100,
                textAlignVertical: "top",
                maxHeight: 160,
              },
            ]}
            placeholder={
              "Enter Item Details..."
            }
            value={description}
            placeholderTextColor={"#707070"}
            onChangeText={(text) => {
              setDescription(text);
            }}
            multiline={true}
            numberOfLines={2}
            maxLength={500}
          />
          {description.length > 0 && (
            <Text style={styles.lengthLimit}>{description.length}/500</Text>
          )}
        </View>

        {<TouchableOpacity 
            style={{backgroundColor: '#F4F4F4', width: 200, height: 200, borderRadius: 50, alignSelf: "center"}}
            onPress={() => {
                setShowCamera(true);
            }}
            >

            {!image && <Image
                source={{ uri: 'https://www.shareicon.net/download/2017/05/24/886398_add_512x512.png' }}
                style={{ width: 100, height: 100, borderRadius: 10, alignSelf: "center", alignContent: "center", marginTop: 50 }}
            />}


            {image && <Image
                source={{ uri: image}}
                style={{ width: 200, height: 200, borderRadius: 10, alignSelf: "center", alignContent: "center", marginTop: 0 }}
            />}

        </TouchableOpacity>}

        

        {camera && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              setShowCamera(false);
            }}
          >
            <Camera
              style={{ flex: 1 }}
              ratio="16:9"
              flashMode={Camera.Constants.FlashMode.off}
              type={type}
              ref={(ref) => {
                setCameraRef(ref);
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    backgroundColor: "black",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    icon="close"
                    style={{ marginLeft: 12 }}
                    mode="outlined"
                    color="white"
                    onPress={() => {
                      setShowCamera(false);
                    }}
                  >
                    Close
                  </Button>
                  <TouchableOpacity
                    onPress={async () => {
                      if (cameraRef) {
                        let photo = await cameraRef.takePictureAsync();
                        setImage(photo.uri);
                        setShowCamera(false);
                      }
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 50,
                        borderColor: "white",
                        height: 50,
                        width: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 16,
                        marginTop: 16,
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 2,
                          borderRadius: 50,
                          borderColor: "white",
                          height: 40,
                          width: 40,
                          backgroundColor: "white",
                        }}
                      ></View>
                    </View>
                  </TouchableOpacity>
                  <Button
                    icon="axis-z-rotate-clockwise"
                    style={{ marginRight: 12 }}
                    mode="outlined"
                    color="white"
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    {type === Camera.Constants.Type.back ? "Front" : "Back "}
                  </Button>
                </View>
              </View>
            </Camera>
          </Modal>
        )}
        <View style={styles.purpleButton}>
          <PurpleButton
            text={"List Item"}
            onPress={() => {
              console.log("ITEM ADDED");
            }}
            isLoading={isLoading}
            enabled
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  purpleButton: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    // position: "absolute",
    // bottom: Layout.window.height * 0.05,
  },
  buttonContinue: {
    backgroundColor: "#673ab7",
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 2,
    width: "60%",
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    margin: 0,
  },
  lengthLimit: {
    alignSelf: "flex-end",
    top: -20,
    right: 24,
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    color: "#707070",
  },
});