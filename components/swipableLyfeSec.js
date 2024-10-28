import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextAvatar from './textAvatar';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLocalNotification } from "./useLocalNotification";
import * as Notifications from "expo-notifications";
import { schedulePushNotification } from "./handle-local-notification";
import { Button } from "react-native";
import { useNavigation } from '@react-navigation/core';
import useColors from "../hooks/useColors";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import HorizontalItems, {HorizontalItem} from "./HorizontalItems";
import {Categories, News, NewsListLyfSec, ItemListLyfSec} from "../data";
import {Ionicons} from "@expo/vector-icons";
import Font from "../constants/Font";

import Page, { PAGE_WIDTH } from './Page';
import Dot from "./DotNotification";
import HorizontalNewsList from "./HorizontalNewsList";
import Cards from './Cards';
import { ScrollView } from 'react-native-gesture-handler'
import Icons from "@expo/vector-icons/MaterialIcons";
import { Video } from 'expo-av';
import ZoomableImage from './ZoomableImage';
import ModalPopupChatbot from '../components/ModalPopupChatbot';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});
//import Notifications from '../model/Notifications';
const Notifications_arr = [

            {
              title: 'Fire Alert - Floor 2, Block B1',
              subTitle: 'Fire Alert - Floor 2, Block B1',
              avatarText: 'Q',
              avatarColor: '#313552',
              backgroundColor: '#FFCC99',
              description: 'LyfGuard systems have detected a potential fire on Floor 2 of Block B1. Immediate action required.',
              routeName: 'MapViewFireMan'
            },
            {
              title: 'Garbage cleaning required at third floor, block B3',
              subTitle: 'Garbage cleaning required at         3rd Floor , block B3',
              avatarText: 'Q',
              avatarColor: '#313552',
              backgroundColor: '#D3EAD3',
              description: 'Abnormally high garbage containing glass bottles and food items detected at 3rd Floor , block B3. prompt response is required. ',
              routeName: 'CleanerUpload'
            },
            {
              title: '',
              subTitle: 'lyfEye deteced violent activity on 5th floor, Block C3',
              avatarText: 'Q',
              avatarColor: '#313552',
              backgroundColor: '#F2F7FF',
              description: 'lyfEye systems have reported high density & violence at 5th floor, Block C3. Detected wrongdoer is wearing pink tshirt. Immediate action required',
              routeName: 'LyfEyeDashboard'
            },
            {
              title: '',
              subTitle: 'Garbage cleaning required on    1st Floor, Block B2',
              avatarText: 'Q',
              avatarColor: '#313552',
              backgroundColor: '#D3EAD3',
              description: 'Excessive garbage consisting of pizza box and soft drink spills detected on 1st Floor, Block B2. Immediate response required.',
              routeName: 'CleanerUpload'
            },
            {
              title: 'Fire Detected - Ground Floor, Community Centre',
              subTitle: 'Fire Detected - Ground Floor, Community Centre',
              avatarText: 'Q',
              avatarColor: '#313552',
              backgroundColor: '#FFCC99',
              description: 'LyfGuard systems have detected a fire at the ground floor of Community Centre post a gathering. Prompt action is required',
              routeName: 'MapViewFireMan'
            },
      ];
const NotificationScreen = ({navigation}) => {


const navigations = useNavigation();

useLocalNotification();
  const handleLocalPushNotification = async (title, subtitle, body) => {
    await schedulePushNotification(title, subtitle, body);
  };

  const [listData, setListData] = useState(
    Notifications_arr.map((NotificationItem, index) => ({
      key: `${index}`,
      title: NotificationItem.title,
      details: NotificationItem.description,
      avatarText: NotificationItem.avatarText,
      avatarColor: NotificationItem.avatarColor,
      subTitle: NotificationItem.subTitle,
      backgroundColor: NotificationItem.backgroundColor,
      description: NotificationItem.description,


    })),
  );

  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 5000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

//  console.log(listData)

useEffect(() => {
        // setListData(Notifications_arr);
    }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);


    if(rowKey == 0){


      navigations.navigate('FiremanViewTask', {
        username: 'username',
        jwt: 'token',
      });


    }

    if(rowKey == 1){


      navigations.navigate('CleanerUpload', {
        username: 'username',
        jwt: 'token',
      });

      
    }
    
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  const VisibleItem = props => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    const colors = useColors();


    return (

      <Animated.View >
                <TouchableOpacity
                // onPress={() => navigate("Details", { news: newsItem })}
                // key={newsItem.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  borderRadius: 50,
                  backgroundColor: data.item.backgroundColor,
                  padding: Spacing.padding.base + 10,
                  marginBottom: 30,
                  marginTop: 0,
                  height: 168
                }}
              >

                    <View
                        style={{
                          // padding: Spacing.padding.sm,
                          marginRight: Spacing.margin.base,
                          marginLeft: 100,
                          position: "absolute",
                          right: 8,
                          backgroundColor: "red",
                          borderRadius: 50,
                          width: 10,
                          height: 10
                          
                        }}
                      >
                        
                    </View>
                <View
                  style={{
                    width: "100%",
                    paddingRight: Spacing.padding.sm,
                  }}
                >
                  <View style={{
                      flexDirection: "row",
                      // justifyContent: "flex-end",
                      alignItems: "center",
                      // marginRight: 10
                    }}>
                    <Text
                      style={{
                        fontSize: FontSize.base,
                        fontFamily: Font["poppins-semiBold"],
                        color: colors.secondary,
                        textTransform: "uppercase",
                        fontWeight: "bold"
                      }}
                    >

                    {data.item.subTitle}
                      
                    </Text>
                    <TouchableOpacity
                        style={{
                          padding: Spacing.padding.sm,
                          marginRight: Spacing.margin.base,
                          right: -30,
                          top: -10,
                          // marginLeft: 50,
                          position: "absolute"
                          
                        }}
                      >
                        <Ionicons
                          name='bookmark-outline'
                          size={FontSize.lg}
                          color={colors.textGray}
                        />
                    </TouchableOpacity>
                    </View>
                  <Text
                    style={{
                      fontSize: FontSize.base,
                      fontFamily: Font["poppins-semiBold"],
                      marginVertical: Spacing.margin.sm,
                      
                    }}
                    // numberOfLines={3}
                  >
                    {data.item.description}
                  </Text>
                  
                </View>
                <View>
                </View>
              </TouchableOpacity>
              </Animated.View>

              
    );


  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        {/* <Text>Left</Text> */}
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>


                <Icon name="ios-checkmark" size={25} color="#fff" />

              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => {
          deleteRow(rowMap, data.item.key)
          navigations.navigate(data.item.routeName, {
            username: 'username',
            jwt: 'token',
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      
      <ScrollView style={{
              paddingVertical: 0,
              width: PAGE_WIDTH - 30,
              height: 240

            }}
            showsVerticalScrollIndicator={false}
            horizontal={false}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
      </ScrollView>

      <ModalPopupChatbot visible={modalVisible}>

        <TouchableOpacity onPress={() => setModalVisible(false)} style={{marginTop: 30}}>
            <Ionicons
                name="close-outline"
                size={24}
                color="#52575D"></Ionicons>

        <Text style={{marginTop: -26, marginLeft: 130, fontSize: 16, fontWeight: "bold", marginBottom: 20}}>LYF CAMS </Text>
        </TouchableOpacity>


        <ScrollView
                    style={{marginTop:30, zIndex: 999, marginBottom: 20}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >

                
                    {ItemListLyfSec.map((item) => (

                        <View style={{ padding: 6, height: 300, width: 300, marginLeft: 20 }}>
                        <View
                        style={{
                            // aspectRatio: 2 / 3,
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 24,
                        }}
                        >
                       
                        <Video
                          source={{ uri: item.imageUrl }}
                          style={{ 
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 280,
                            height: 280,
                            borderRadius: 90
                          }}
                          resizeMode="contain"
                          isLooping
                          useNativeControls={false}
                          shouldPlay={true}
                          isMuted={true}
                        />
                        <View
                            style={[
                            {
                                padding: 12,
                            },
                            ]}
                        >
                            <View style={{ flexDirection: "row", marginHorizontal: 4, marginVertical: -4,  padding: 4, marginLeft: -3 }}>
                            <Text
                                style={{
                                
                                textAlign: "center",
                                flex: 1,
                                fontSize: 16,
                                fontWeight: "600",
                                color: "#222",
                                textShadowColor: "rgba(0,0,0,0.2)",
                                textShadowOffset: {
                                    height: 1,
                                    width: 0,
                                },
                                textShadowRadius: 4,
                                fontWeight: "bold",
                                
                                }}
                            >
                                {item.title}
                            </Text>
                            
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
                                marginTop: 210,
                                justifyContent: "center"
                            }}
                            intensity={20}
                            >
                            <Text
                                style={{
                                flex: 1,
                                fontSize: 16,
                                fontWeight: "600",
                                color: "#fff",
                                marginLeft:80,
                                justifyContent: "center",
                                alignSelf: "center",
                                alignContent: "center"
                                }}
                                numberOfLines={1}
                            >
                                SEE LIVE
                            </Text>
                            <TouchableOpacity
                                style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 100,
                                backgroundColor: "#fff",
                                }}
                            >
                                <Icons name="airplay" size={18} color="#000" />
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                        </View>

                    ))}



                    

                
                </ScrollView>

            
            {/* <ChatbotScreen /> */}


      </ModalPopupChatbot>

      <View style={{marginTop: -60}}>
      <ZoomableImage source={require("../assets/images/lyfeye_map_w_cameras_heatmap.png")} />
                
                {/* <ScrollView
                    style={{marginTop:100, zIndex: 999}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >

                
                    {ItemListLyfSec.map((item) => (

                        <View style={{ padding: 6, height: 300, width: 300, marginLeft: 20 }}>
                        <View
                        style={{
                            // aspectRatio: 2 / 3,
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 24,
                        }}
                        >
                       
                        <Video
                          source={{ uri: 'https://rr14---sn-ci5gup-h55l.googlevideo.com/videoplayback?expire=1728388913&ei=0coEZ9fgIPPl9fwPrKPzwQk&ip=202.89.67.104&id=o-AI2HnCxjH27AYSPEpJJUs1p6I1PQ9qSqLgOGhZvdvLhy&itag=137&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXLXGFRfQs0pA9KWq2MHKzqNm2FyPQuNedJxS4YS-ECTs9HrwJe97pqt3hOW4SWB1zPXTMLBL2iV6ECH&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=2417392&dur=23.490&lmt=1724394197199249&keepalive=yes&fexp=24350654,51300761&c=MEDIA_CONNECT_FRONTEND&txp=543C434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAIQZZL0YPB7EKcO7U0sciALowoNkPXQa6rUYoHadreRyAiEA6dVsbCXXYv6tS94UQZACsQfjrz7wMI07X4n9lX0XZLc%3D&rm=sn-fvgaq2ivox-qxal7e,sn-qxaly7z&rrc=79,104&req_id=558e9ba470caa3ee&met=1728384102,&rms=rdu,rdu&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=F9&mip=2401:4900:4e60:ada8:643e:2653:2774:411f&mm=29&mn=sn-ci5gup-h55l&ms=rdu&mt=1728383311&mv=u&mvi=14&pl=44&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRgIhANuuK71OrPw15wF2eVsRsnQvaqyHZHPXVRraLsLrSFQ-AiEA_eLYMyd8a6oPeRC9b2obhkX9ELHkA5kOlJdJfsOK8V0%3D' }}
                          style={{ 
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 280,
                            height: 280,
                            borderRadius: 90
                          }}
                          resizeMode="contain"
                          isLooping
                          useNativeControls={false}
                          shouldPlay={true}
                        />
                        <View
                            style={[
                            {
                                padding: 12,
                            },
                            ]}
                        >
                            <View style={{ flexDirection: "row", marginHorizontal: 4, marginVertical: -4,  padding: 4, marginLeft: -3 }}>
                            <Text
                                style={{
                                
                                textAlign: "center",
                                flex: 1,
                                fontSize: 16,
                                fontWeight: "600",
                                color: "#222",
                                textShadowColor: "rgba(0,0,0,0.2)",
                                textShadowOffset: {
                                    height: 1,
                                    width: 0,
                                },
                                textShadowRadius: 4,
                                fontWeight: "bold",
                                
                                }}
                            >
                                {item.title}
                            </Text>
                            
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
                                marginTop: 210,
                                justifyContent: "center"
                            }}
                            intensity={20}
                            >
                            <Text
                                style={{
                                flex: 1,
                                fontSize: 16,
                                fontWeight: "600",
                                color: "#fff",
                                marginLeft:80,
                                justifyContent: "center",
                                alignSelf: "center",
                                alignContent: "center"
                                }}
                                numberOfLines={1}
                            >
                                SEE LIVE
                            </Text>
                            <TouchableOpacity
                                style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 100,
                                backgroundColor: "#fff",
                                }}
                            >
                                <Icons name="airplay" size={18} color="#000" />
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                        </View>

                    ))}



                    

                
                </ScrollView> */}


               

                
            </View>


    </View>


  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
    height: 100
  },
  backRightBtnLeft: {
    backgroundColor: '#CCD1E4',
    right: 85,
  },
  backRightBtnRight: {
    backgroundColor: '#96CEB4',
    right: 16,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 20,
    alignItems: "center"
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },

  row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: '#FFCC99',
      borderRadius: 23,
      marginBottom: 10
    },
    mailText: {
      marginLeft: 15,
      width: '80%',
    },
    bold: {
      fontWeight: 'bold',
    },
    title: {
      fontSize: 16,
      marginTop: 10,

    },
    subTitle: {
      fontSize: 15,
      marginTop: 10,
      marginBottom: 10,
    },
});
