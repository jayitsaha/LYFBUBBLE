import { View, Text, Image, ScrollView, ToastAndroid, TouchableOpacity, Alert, Animated, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import React, {Component} from 'react';
import { useEffect, useRef, useState } from "react";
import Voice from "@react-native-community/voice"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { dummyMessages } from "../constants_chatbot";
import { apiCall } from "../api/gpt";

export default function HomeScreen() {
    const [messages, setMessages] = useState(dummyMessages);
    const [result, setResult] = useState("");
    const ScrollViewRef = useRef();
    const [keyboardVisible, setKeyboardVisible] = useState(false); 


    const clear = () => {
        setMessages([]);
    };

    useEffect(() => {
        // Add listeners for keyboard show and hide
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true); // Hide messagesContainer
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false); // Show messagesContainer
        });

        // Cleanup the listeners when the component is unmounted
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const handleSubmit = () => {
        setResult("");
        if (result.length > 0) {
            const newMessages = [...messages];
            newMessages.push({ role: "user", content: result.trim() });
            setMessages([...newMessages]);
            updateScrollView();
            apiCall(result.trim(), newMessages).then((res) => {
                if (res.success) {
                    setMessages([...res.data]);
                    updateScrollView();
                    setResult(""); // Clear the input after sending
                } else {
                    // Dummy error message from chatbot
                    const errorMessage = {
                        role: "assistant",
                        content: "Oops! Something went wrong. Please try again.",
                    };
                    setMessages([...newMessages, errorMessage]);
                    updateScrollView();
                }
            }).catch(() => {
                const errorMessage = {
                    role: "assistant",
                    content: "I'm having trouble processing that right now. Please try later!",
                };
                setResult("");
                setMessages([...newMessages, errorMessage]);
                updateScrollView();
            });
        }
    };

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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Use "padding" for iOS and "height" for Android
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}  // Adjust this offset based on design needs
        >
            <SafeAreaView style={styles.safeArea}>
                {/* <View style={styles.botIconContainer}>
                    <Image source={require('../assets/images/chatbot_icon.png')} style={styles.botIcon} />
                </View> */}
                {messages.length > 0 && !keyboardVisible ? (
                    <View style={styles.messagesContainer}>
                        {/* <Text style={styles.assistantText}>Assistant</Text> */}
                        <View style={styles.messagesView}>
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
                                                <View key={index} style={styles.assistantMessage}>
                                                    <Text>{message.content}</Text>
                                                </View>
                                            );
                                        }
                                    } else {
                                        return (
                                            <View key={index} style={styles.userMessageContainer}>
                                                <View style={styles.userMessage}>
                                                    <Text>{message.content}</Text>
                                                </View>
                                            </View>
                                        );
                                    }
                                })}
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <></>
                )}
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={result}
                        onChangeText={setResult}
                        placeholder="Type your message..."
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>

                {!keyboardVisible && <View style={styles.dummyVoiceContainer}>
                    {/* <TouchableOpacity onPress={() => Alert.alert("Voice Recording Dummy")} style={styles.voiceButton}>
                        <Image
                            source={require('../assets/images/chatbot_icon.png')}
                            style={styles.voiceButtonIcon}
                        />
                    </TouchableOpacity> */}
                </View>}
            </SafeAreaView>
        </KeyboardAvoidingView>
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
        marginTop: 10,
        marginBottom: -100
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
        backgroundColor: '#a7f3d0',
        borderRadius: 16,
        padding: 8,
        borderTopRightRadius: 0,
        marginBottom: 15
    },
    userMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    userMessage: {
        width: wp(70),
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
        backgroundColor: '#1e90ff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 30
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dummyVoiceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 120
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

