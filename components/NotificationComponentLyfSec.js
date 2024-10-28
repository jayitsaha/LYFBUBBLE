import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import React, {useState} from "react";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import HorizontalItems, {HorizontalItem} from "../components/HorizontalItems";
import {Categories, News, NewsListLyfSec, ItemList} from "../data";
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
import CustomHeaderLyfSec from './CustomHeaderLyfSec'

const NewsScreen= () => {
    const colors = useColors();
    const {navigate} =
        useNavigation();

    const [news, setNews] = useState(NewsListLyfSec);

    const handleCategory = ({id}) => {
        setNews(NewsListLyfSec.filter((news) => news.categoryId === id));
    };

    return (
      <SafeAreaView>
        
        <View
          style={{
            padding: Spacing.padding.base,
            marginTop: 450,
            height: 260
            // width: PAGE_WIDTH-20
            
          }}
        >
            <CustomHeaderLyfSec />
          {/* <HorizontalItems onClick={handleCategory} items={Categories} /> */}
          <ScrollView
            style={{
              paddingVertical: Spacing.padding.base,
              width: PAGE_WIDTH - 30

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
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  borderRadius: 50,
                  backgroundColor: 'rgb(245, 235, 226)',
                  padding: Spacing.padding.base + 10,
                  marginBottom: 30,
                  marginTop: 20,
                  height: "auto"
                }}
              >

                    <View
                        style={{
                          // padding: Spacing.padding.sm,
                          marginRight: Spacing.margin.base,
                          marginLeft: 100,
                          position: "absolute",
                          right: 2,
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

                      {newsItem.header}
                      
                    </Text>
                    <TouchableOpacity
                        style={{
                          padding: Spacing.padding.sm,
                          marginRight: Spacing.margin.base,
                          marginLeft: 100
                          
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
                    numberOfLines={3}
                  >
                    {newsItem.title}
                  </Text>
                  
                </View>
                <View>

                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        
        <View style={{marginTop: -100}}>
                
                <ScrollView
                    style={{marginTop:100, zIndex: 999}}
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
                                marginLeft: 8,
                                }}
                                numberOfLines={1}
                            >
                                ${item.price}
                            </Text>
                            <TouchableOpacity
                                style={{
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                borderRadius: 100,
                                backgroundColor: "#fff",
                                }}
                            >
                                <Icons name="add-shopping-cart" size={18} color="#000" />
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
