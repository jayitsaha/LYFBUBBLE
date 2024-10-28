import { View, Text, Image, ScrollView, ToastAndroid, TouchableOpacity, Alert, Animated, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import React, {Component} from 'react';
import { useEffect, useRef, useState } from "react";
import Voice from "@react-native-community/voice"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { dummyMessages } from "../constants_chatbot";
// import { apiCall } from "../api/gpt";
import Groq from "groq-sdk";
import base64 from 'react-native-base64';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {
    const [messages, setMessages] = useState(dummyMessages);
    const [result, setResult] = useState("");
    const ScrollViewRef = useRef();
    const [keyboardVisible, setKeyboardVisible] = useState(false); 
    const [containerStyle, setContainerStyle] = useState(styles.inputContainer); 
    const [containerStyleMessage, setContainerStyleMessage] = useState(styles.messagesView);
    const [groq, setGroq] = useState(null);
    const [image, setImage] = useState(null); // To store the image path or URI
    const [base64Image, setBase64Image] = useState(''); // To store the base64-encoded image
    const [imageUri, setImageUri] = useState(null);


    useEffect(() => {
        const newGroq = new Groq({
            apiKey: "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",
        });
        setGroq(newGroq);
    }, []); 




    const clear = () => {
        setMessages([]);
    };

    useEffect(() => {
        // Add listeners for keyboard show and hide
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true); 
            setContainerStyle({ ...styles.inputContainer, marginVertical: 220 }); 
            setContainerStyleMessage({ ...styles.messagesView, height: hp(30) }); 
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false); // Show inputContainer
            setContainerStyle({ ...styles.inputContainer, marginVertical: 450 });
            setContainerStyleMessage({ ...styles.messagesView, height: hp(58) });  
        });

        // Cleanup the listeners when the component is unmounted
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);



    // const sendMessage = async () => {
    //     const newMessage = {
    //       role: "user",
    //       content: inputText,
    //     };
    //     setMessages([...messages, newMessage]);
    //     setInputText("");
    
    //     const chatCompletion = await groq.chat.completions.create({
    //       messages: [
    //         {
    //           role: "user",
    //           content:
    //             "You are an AI chatbot that represents Kashf Foundation. Clients may ask you questions regarding Kashf Foundation policies. You always have to reply and type in Urdu using Urdu font. Understood?",
    //         },
           
    //         newMessage,
    //       ],
    //       model: "llama3-8b-8192",
     
    //     });
    //     console.log(chatCompletion)
    //     console.log(groq)
    
    //     for await (const message of chatCompletion) {
    //         const assistantMessage = {
    //           role: "assistant",
    //           content: message.choices[0]?.delta?.content || "",
    //         };
    //         setMessages([...messages, assistantMessage]);
    //       }
    //   };


    const handleSubmitGroq = async () => {



        try {

            // setResult("");
        if (result.length > 0) {
            const newMessages = [...messages];
            newMessages.push({ role: "user", content: result.trim() });
            setMessages([...newMessages]);
            updateScrollView();

  
        
    


            const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
            const apiKey = "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"; 
            const model = "llama3-8b-8192";
            const userMessage = "Explain the importance of fast language models";


            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                          role: "system",
                          content: `you are a hotel receptionist chatbot. what query user asks,, kindly respond in a positive way and in the end return with a text saying that ticket has been lodged and prompt action with be taken `,
                        },
                        { role: "user", content: result.trim() },
                        ...messages,
                      ],
                  model: model,
                }),
              });

              setResult(""); // Clear the input after sending


           

            const jsonResponse = await response.json();
            const messagesGroq = jsonResponse.choices[0].message.content;
            console.log("GROQ RUNNING")
            console.log(messagesGroq)

            const newMessagesResponse = [...newMessages ];
            newMessagesResponse.push({ role: "assistant", content: messagesGroq });
            // setMessages([...newMessagesResponse]);
            updateScrollView();
            
              
      
            const words = messagesGroq.split(" ");
            let currentMessage = "";
      
            // Initialize AI message in the chat history
            setMessages((prevMessages) => [
              ...prevMessages,
              { role: "assistant", content: "" }, // Start with an empty AI message
            ]);
      
            // dismissKeyboard();
            // Update the AI message incrementally by word
            for (const word of words) {
              currentMessage += word + " ";
      
              // Update the last message in the chat history (AI's message)
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].content = currentMessage.trim();
                return updatedMessages;
              });

              updateScrollView();
      
              // Small delay to simulate typing effect (optional)
              await new Promise((resolve) => setTimeout(resolve, 50));
            }
          } 
        }
          catch (error) {
            console.error("Error fetching response:", error);
          }

    }


    // Function to handle picking image from device
  const pickImage = async () => {
    // Ask for permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    // Launch Image Picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: false, // Base64 is off here, we will handle it later
    });

    if (!result.cancelled) {
      setImage(result.uri);  // Store the selected image URI
      convertToBase64(result.uri);  // Convert the selected image to base64
    }
  };

  // Function to convert image to base64 using FileSystem
  const convertToBase64 = async (imageUri) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Image(base64String);  // Store the base64 string
    } catch (error) {
      console.error("Error converting image to base64: ", error);
    }
  };







    const handleSubmitGroqVision = async () => {

        try {

        
            const newMessages = [...messages];
            newMessages.push({ role: "user", content: result.trim() });
            setMessages([...newMessages]);
            updateScrollView();    


            const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
            const apiKey = "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"; 
            const model = "llama-3.2-11b-vision-preview";
            const userMessage = "Explain the importance of fast language models";


            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        
                        { role: "user", 
                        content: [
                            {
                                "type": "text",
                                "text":  `you are a hotel receptionist chatbot. what query user asks,, kindly respond in a positive way and in the end return with a text saying that ticket has been lodged and prompt action with be taken
                                                   
                                          User Query; ${result.trim()}

                                          Answer in a concise format
                                `
                            },

                           

                        ]
                    
                    
                    
                    
                    },
                    {
                        "role": "assistant",
                        "content": ""
                    }
                      ],
                  model: model,
                }),
              });


            //   const response_flask = await fetch('http://100.64.90.22:3000/api/get_closest_item', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ base64_data: base64Image }),
            //   });
        
            //   const data_flask = await response_flask.json();


            //   console.log("DATA FLASK")

            //   console.log(data_flask)

             




              setResult(""); // Clear the input after sending


           

            const jsonResponse = await response.json();
            const messagesGroq = jsonResponse.choices[0].message.content;
            console.log("GROQ RUNNING")
            console.log(messagesGroq)

            const newMessagesResponse = [...newMessages ];
            newMessagesResponse.push({ role: "assistant", content: messagesGroq });
            updateScrollView();
            
              
      
            const words = messagesGroq.split(" ");
            let currentMessage = "";
      
            // Initialize AI message in the chat history
            setMessages((prevMessages) => [
              ...prevMessages,
              { role: "assistant", content: "" }, // Start with an empty AI message
            ]);
      
            // dismissKeyboard();

            // Update the AI message incrementally by word
            for (const word of words) {
              currentMessage += word + " ";
      
              // Update the last message in the chat history (AI's message)
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].content = currentMessage.trim();
                return updatedMessages;
              });

              updateScrollView();
      
              // Small delay to simulate typing effect (optional)
              await new Promise((resolve) => setTimeout(resolve, 50));

            //   setImageUri(data_flask.recommended_image); 
            }
          } 
          catch (error) {
            console.error("Error fetching response:", error);
          }

    }


    // const handleSubmit = () => {
    //     setResult("");
    //     if (result.length > 0) {
    //         const newMessages = [...messages];
    //         newMessages.push({ role: "user", content: result.trim() });
    //         setMessages([...newMessages]);
    //         updateScrollView();
    //         apiCall(result.trim(), newMessages).then((res) => {
    //             if (res.success) {
    //                 setMessages([...res.data]);
    //                 updateScrollView();
    //                 setResult(""); // Clear the input after sending
    //             } else {
    //                 // Dummy error message from chatbot
    //                 const errorMessage = {
    //                     role: "assistant",
    //                     content: "Oops! Something went wrong. Please try again.",
    //                 };
    //                 setMessages([...newMessages, errorMessage]);
    //                 updateScrollView();
    //             }
    //         }).catch(() => {
    //             const errorMessage = {
    //                 role: "assistant",
    //                 content: "I'm having trouble processing that right now. Please try later!",
    //             };
    //             setResult("");
    //             setMessages([...newMessages, errorMessage]);
    //             updateScrollView();
    //         });
    //     }
    // };

    const updateScrollView = () => {
        setTimeout(() => {
            ScrollViewRef?.current?.scrollToEnd({ animated: true });
        });
    };

    useEffect(() => {
        const speechStartHandler = () => {
            console.log("speech start handler");
        };
        const speechEndHandler = () => {
            console.log("speech end handler");
        };
        const speechErrorHandler = () => {
            console.log("speech error handler");
        };

        speechStartHandler();
        speechEndHandler();
        speechErrorHandler();
    });

    return (
        <>
           
               
                {messages.length > 0 && 1==1 ? (
                    <View style={styles.messagesContainer}>
                        {/* <Text style={styles.assistantText}>Assistant</Text> */}
                        <View style={containerStyleMessage}>
                            <ScrollView ref={ScrollViewRef} bounces={false} showsVerticalScrollIndicator={false}>
                                {messages.map((message, index) => {
                                    if (message.role === 'assistant') {
                                        if (message.content.includes('https')) {
                                            return (
                                                <View key={index} style={styles.aiImageContainer}>
                                                    <View style={styles.aiImageWrapper}>
                                                        <Image
                                                            source={{ uri: message.content }}
                                                            resizeMode="contain"
                                                            style={styles.aiImage}
                                                        />
                                                    </View>
                                                </View>
                                            );
                                        } else {
                                            return (
                                                <>
                                                <View key={index} style={styles.assistantMessage}>
                                                    <Text>{message.content}</Text>
                                                </View>

                                               {/* {imageUri && <View key={index} style={styles.assistantMessage}>
                                                    <Text>Here's a recommendation from LyfMart</Text>
                                                </View>} */}



                                                {/* {imageUri && <View key={index} style={styles.assistantMessage}>
                                                <View style={styles.userMessageImage}>
                                                <Image source={{ uri: imageUri }} style={{ width: 220, height: 220, marginTop: 10, marginLeft:0, borderRadius: 20, marginBottom: 10, justifyContent: "center", alignContent: "center", alignSelf: "center" }} />
                                                </View>
                                                </View>} */}

                                                </>
                                            );
                                        }
                                    } else {

                                          return (
                                            <>
                                            {/* {image && <View key={index} style={styles.userMessageContainer}>
                                                <View style={styles.userMessage}>
                                                <Image source={{ uri: image }} style={{ width: 220, height: 220, marginTop: 10, marginLeft:0, borderRadius: 20, marginBottom: 10, justifyContent: "center", alignContent: "center", alignSelf: "center" }} />
                                                </View>
                                            </View>} */}

                                            <View key={index} style={styles.userMessageContainer}>
                                                <View style={styles.userMessage}>
                                                    <Text>{message.content}</Text>
                                                </View>
                                            </View>

                                            
                                            </>
                                          )

                                        
                                        
                                    }
                                })}
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <></>
                )}
                
                <View style={containerStyle}>

                    <TouchableOpacity onPress={pickImage} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>+</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        value={result}
                        onChangeText={setResult}
                        placeholder="Type your message..."
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={handleSubmitGroqVision} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>

                   
                </View>

                
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    safeArea: {
        flex: 1,
        marginHorizontal: 20,
    },
    botIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    botIcon: {
        height: hp(15),
        width: wp(15),
    },
    messagesContainer: {
        flex: 1,
        // marginTop: -150,
        marginBottom: -0
    },
    assistantText: {
        color: '#4a4a4a',
        fontWeight: '600',
        marginLeft: 5,
    },
    messagesView: {
        height: hp(58),
        backgroundColor: '#e0e0e0',
        borderRadius: 30,
        padding: 16,
        marginBottom: 100
    },
    aiImageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    aiImageWrapper: {
        padding: 8,
        borderRadius: 16,
        backgroundColor: '#a7f3d0',
        borderTopLeftRadius: 0,
    },
    aiImage: {
        height: hp(60),
        width: wp(60),
    },
    assistantMessage: {
        width: wp(70),
        backgroundColor: '#fee14070',
        borderRadius: 16,
        padding: 15,
        borderTopRightRadius: 0,
        marginBottom: 15
    },
    userMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    userMessage: {
        width: wp(70),
        backgroundColor: '#ffffff99',
        borderRadius: 16,
        padding: 8,
        borderTopRightRadius: 0,
        marginBottom: 15
    },

    userMessageImage: {
        width: wp(62),
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 8,
        borderTopRightRadius: 0,
        marginBottom: 15
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginVertical: 450
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        color: '#333',
        marginTop: 30
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#fee14099',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 30,
        marginRight: 5
    },
    sendButtonText: {
        color: '#00000095',
        fontWeight: 'bold',
    },
    dummyVoiceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 120,
    },
    voiceButton: {
        marginTop: 20,
        borderRadius: 50,
        width: wp(10),
        height: hp(10),
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    voiceButtonIcon: {
        width: wp(10),
        height: hp(10),
        marginTop: -100
    },
});

