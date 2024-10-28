import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React, {useState} from "react";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import HorizontalItems, {HorizontalItem} from "../components/HorizontalItems";
import {Categories, News, NewsList, ItemList} from "../data";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Font from "../constants/Font";
import useColors from "../hooks/useColors";
import {useNavigation} from "@react-navigation/native";
import Page, { PAGE_WIDTH } from '../components/Page';
import Dot from "../components/DotNotification";
import HorizontalNewsList from "./HorizontalNewsList";
import Cards from '../components/Cards';
import { ScrollView }
    from 'react-native-gesture-handler'
    import Icons from "@expo/vector-icons/MaterialIcons";
import CustomHeader from './CustomHeader'

const NewsScreen= () => {
    const colors = useColors();
    const {navigate} =
        useNavigation();

    const [news, setNews] = useState(NewsList);

    const handleCategory = ({id}) => {
        setNews(NewsList.filter((news) => news.categoryId === id));
    };

    return (
      <SafeAreaView>
        {/* <Text> HELLO</Text> */}
        
        <View
          style={{
            padding: Spacing.padding.base,
            marginTop: 400,
            height: 260,
            // width: PAGE_WIDTH-20
            
          }}
        >
            <CustomHeader />
          {/* <HorizontalItems onClick={handleCategory} items={Categories} /> */}
          <ScrollView
            style={{
              paddingVertical: Spacing.padding.base-20,
              width: PAGE_WIDTH - 30,
              marginBottom: -20

            }}
            showsVerticalScrollIndicator={false}
            horizontal={false}
          >
            {news.map((newsItem) => (
              <TouchableOpacity
                onPress={() => navigate("Details", { news: newsItem })}
                key={newsItem.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                //   paddingVertical: Spacing.padding.base + 10,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  borderRadius: 50,
                  backgroundColor: '#fee14060',
                  padding: Spacing.padding.base + 10,
                  marginBottom: 30,
                  marginTop: 20
                }}
              >
                <View
                  style={{
                    width: "84%",
                    paddingRight: Spacing.padding.sm,
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSize.base,
                      fontFamily: Font["poppins-semiBold"],
                      color: colors.secondary,
                      textTransform: "uppercase",
                      fontWeight: "bold"
                    }}
                  >

                    {newsItem.header}
                    
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSize.base,
                      fontFamily: Font["poppins-semiBold"],
                      marginVertical: Spacing.margin.sm,
                      textAlign: "left"
                      
                    }}
                    // numberOfLines={6}
                  >
                    {newsItem.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: Spacing.margin.base,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: FontSize.sm,
                        color: colors.textGray,
                      }}
                    >
                      {newsItem.time}
                    </Text>
                    <Dot />
                    <Text
                      style={{
                        fontSize: FontSize.sm,
                        color: colors.textGray,
                      }}
                    >
                      {newsItem.length}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 100,
                      marginLeft: -5,
                      marginTop: -14
                    }}
                    source={newsItem.image}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginRight: 10,
                      marginLeft: -10
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        padding: Spacing.padding.sm,
                      }}
                    >
                      <Ionicons
                        name='bookmark-outline'
                        size={FontSize.lg}
                        color={colors.textGray}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: Spacing.padding.sm,
                      }}
                    >
                      <MaterialCommunityIcons
                        name='dots-horizontal'
                        size={FontSize.lg}
                        color={colors.textGray}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        
        <View style={{marginTop: -80}}>

                    <Image
                            source={{
                            uri: 'https://res.cloudinary.com/dyfmlusbc/image/upload/t_jayitlyfbubblebanner/v1729858114/Screenshot_2024-10-25_at_5.38.13_PM_e6tp31.png'
                            }}
                            resizeMode="contain"
                            style={{position: "absolute",
                              left: -0,
                              right: 0,
                              top: 120,
                              bottom: 0,
                            borderRadius: 50, 
                          height: 260, marginRight: 260}}
                        />

            
                
                <ScrollView
                    style={{marginTop:100, zIndex: 999, marginLeft: 100}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    {ItemList.map((item) => (

                        <View style={{ padding: 6, height: 300, marginLeft: 20 }}>
                        <View
                        style={{
                            aspectRatio: 2 / 3,
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
                            // StyleSheet.absoluteFill,
                            {
                                padding: 12,
                            },
                            ]}
                        >
                            <View style={{ flexDirection: "row", marginHorizontal: 4, marginVertical: -4,  padding: 4, marginLeft: -3 }}>
                            <Text
                                style={{
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
                                }}
                            >
                                {/* {item.title} */}
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
                                marginTop: 160
                            }}
                            intensity={20}
                            >
                            <Text
                                style={{
                                  flex: 1,
                                  fontSize: 16,
                                  fontWeight: "600",
                                  color: "#fff",
                                  // marginLeft: 8,
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
                                }}
                            >
                                <Image style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        position: "absolute",
                        backgroundColor: "tranparent",
                        marginTop: 2.4,
                        marginLeft: -45
                    }} 
                    source={require('../assets/images/gold_coin.webp')} />
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                        </View>



                        
        




                    ))}



                    

                
                </ScrollView>


              





               

                
            </View>



      </SafeAreaView>
    );
};

export default NewsScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        marginTop: 0,
        width: PAGE_WIDTH,
        zIndex: 9999

    },
    cardContainer:{
        height:150,
        width:320,
        alignSelf:"center",
        backgroundColor:"#6A706E",
        borderRadius:30
    },
    card:{
        height:150,
        width:260,
        paddingTop:20,
        paddingHorizontal:30,
        backgroundColor:'#EEEEEE',
        borderRadius:30,
        flexDirection:'row'
    },
    title:{
        color:"#3a4b4f",
        width:100,
        fontSize:12,
        fontWeight:"bold"
    },
    number:{
        color:"#3a4b4f",
        width:100,
        fontSize:22,
        fontWeight:"bold",
        marginTop:-10,
    },
    textCovid:{
        transform:[{ rotate : "-90deg"}],
        color:"#fff",
        fontSize:14,
        width:90,
        marginLeft:-35,
        fontWeight:'bold',
        marginTop:20
    },
    noCard:{
        marginBottom:10,
        color:'#3a4b4f',
        alignSelf:"center"
    },
    map:{
        height:200,
        paddingTop:25,
        paddingHorizontal:20,
        marginBottom:15
    },
    col:{
        flexDirection:'row'
    },
    minusIcon:{
        marginTop:-20,
        marginLeft:5
    },
    avatarContainer:{
        width:"50%",
        alignItems:'flex-end',
    },
    avatar:{
        width:40,
        height:40,
        borderRadius:20
    },
    textDash:{
        color:"#3a4b4f",
        fontSize:20,
        alignSelf:'center',
        marginTop:15,
        fontWeight:'bold'
    },
    colContainer:{
        flexDirection:"row",
        paddingHorizontal:30,
        marginTop:40,
        alignItems:'center',
    },
    textGlobal:{
        fontWeight:"bold",
        fontSize:16,
        color:"red"
    },
    textRussia:{
        fontWeight:"bold",
        fontSize:16,
        paddingHorizontal:30,
        color:"#6a706e"
    },
    reloadContainer:{
        backgroundColor:"#FFF",
        elevation:2,
        width:40,
        height:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:"center",
        marginLeft:50
    },
    containerCard:{
        height:220,
        width:130,
        borderRadius:30,
        padding:15,
        marginLeft:20,
        borderRadius: 20,
        borderColor: "black"
    
      },
      colCard: {
          flexDirection:"row"
      },
      titleCard:{
          marginTop:90,
          color:"#b8b8aa",
          fontWeight:"bold",
          fontSize:12
      },
      numberCard:{
          fontWeight:'bold',
          fontSize:22
      }
    


});
