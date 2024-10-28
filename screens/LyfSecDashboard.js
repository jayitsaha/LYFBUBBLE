
import NavOptions from '../components/NavOptionsPedestrian';
import ChatbotIcon from '../components/ChatbotIcon';


import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ImageBackground,
    TouchableOpacity
 } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { ScrollView }
    from 'react-native-gesture-handler'
import Cards from '../components/Cards';

import Buttons from '../components/Buttons';
import ChartLyfSec from '../components/ChartLyfSec';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from "@react-navigation/native";
import ChartCoverage from '../components/ChartCoverage';
import Icon2 from '@expo/vector-icons/MaterialCommunityIcons'
import ModalPopupCoverage from '../components/ModalPopupCoverage';
import ModalPopupChatbot from '../components/ModalPopupChatbot';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Page, { PAGE_WIDTH } from '../components/Page';
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import { Categories } from "../data";
import useColors from "../hooks/useColors";
import ChatbotScreen from './ChatbotScreenModal'


const DATA = [
    {
        id:1,
        title:"TODAYS PROGRESS",
        number:"1/3"
    },
    {
        id:2,
        title:"NEXT MILESTONE",
        number:"4"
    },
    {
        id:3,
        title:"REWARDS",
        number:"1"
    }
]
class Test extends Component {

    constructor(props){
        super(props);

        this.state = {visible: false, visibleChatbot: false};
    }

 renderCard(item){
   return(
    <View key={item.id} style={styles.cardContainer}>
        <View style={styles.card}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Icon
                    name="ios-remove"
                    size={40}
                    color="red"
                    style={{marginTop:25}}
                />
                <Text style={styles.number}>{item.number}</Text>
            </View>
            <View style={{marginLeft:150}}>
                <Icon name="md-options" size={24} color="#FFF"/>
                <Text style={styles.textCovid}>METRICS</Text>
            </View>
        </View>
    </View>
    );
}

renderNoMoreCards(){
    return(
        <View title="All Domne!">
            <Text style={styles.noCard}>NO MORE CARDS HERE</Text>
            <Button backgroundColor="#03A9F4" title="Get more!"/>
        </View>
    );
}

    render(){
        const { navigation } = this.props;

        return(
            <View style={styles.container}>
                <ImageBackground
//                    source={require("../images/unnamed.jpg")}
                    style={styles.map}
                >
                    {/* <Text style={tw` text-lg font-bold text-center mr-7`}>PEDESTRIAN DASHBOARD</Text> */}<View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.padding.base,
        marginTop: 0
      }}
    >
      
      
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.base,
            fontWeight: "bold",
            marginLeft: 80,
            marginTop: 28,
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          LYFSEC DASHBOARD
        </Text>

        <TouchableOpacity
                        onPress={() => navigation.navigate("AcceptRejectLyfeSec")}
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
                // backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: 100,
                marginLeft: 15,
                padding: 3
                
                }}
            >
                <Image style={{
                    width: 35,
                    height: 35,
                    borderRadius: 4,
                    position: "absolute",
                    backgroundColor: "tranparent",
                    marginTop: 5,
                    marginLeft: 3
                }} 
                source={require('../assets/images/notification.png')} />

                    <View
                        style={{
                          // padding: Spacing.padding.sm,
                          marginRight: Spacing.margin.base,
                          marginLeft: 0,
                          position: "absolute",
                          right: -22,
                          top: 4,
                          backgroundColor: "red",
                          borderRadius: 50,
                          width: 10,
                          height: 10
                          
                        }}
                      >
                        
                    </View>
                
                {/* <Text style={{ fontSize: 14, fontWeight: "600", color: "#222", marginLeft: 20 }}>
                {200}
                </Text> */}
            </View>
        </TouchableOpacity>
    </View>
                    
                     <ChartLyfSec/>
                     
                </ImageBackground>
                {/* <Deck
                    data={DATA}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                /> */}
                <ScrollView
                    style={{marginTop:100}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    <Cards
                        onPress={()=>this.props.navigation.navigate('Detail')}
                        icon="checkmark-circle-outline"
                        title="LYFINCIDENT RATE"
                        bg="'rgb(245, 235, 226)'"
                        iconbg = "rgba(150, 140, 130, 1.0)"
                        number="35%"
                    />
                     <Cards
                        icon="reader-outline"
                        title="AVG INCIDENT RESOLVE TIME"
                        bg="'rgb(245, 235, 226)'"
                        iconbg = "rgba(150, 140, 130, 1.0)"
                        borderRadius={10}

                        number="0.45"
                    />
                     <Cards
                        icon="map-outline"
                        title="ENGAGEMENT INDEX RATIO"
                        bg="'rgb(245, 235, 226)'"
                        iconbg = "rgba(150, 140, 130, 1.0)"
                        number="0.91"
                    />

                    <Cards
                        icon="map-outline"
                        title="LYBUBBLE ADOPTION RATE"
                        bg="'rgb(245, 235, 226)'"
                        iconbg = "rgba(150, 140, 130, 1.0)"
                        number="94%"
                    />

        <View style={{
            ...styles.containerCard, 
            backgroundColor:"'rgb(245, 235, 226)'"
         }}>
            <View style={styles.colCard}>
               <Icon 
                 name="map-outline"
                 size={30}
                 color="rgba(150, 140, 130, 1.0)"
               />
               <TouchableOpacity 
               onPress={() => 
                {
                    console.log("PRESSING")
                this.setState({visible: true})
                }}
                >
                    <Icon2
                        style={{marginLeft:50}}
                        name="dots-vertical"
                        size={30}
                        color="#b8b8aa"
                    />
               </TouchableOpacity>
            </View>
             <Text style={{...styles.titleCard,
             color: this.props.bg == "red" ? "#FFF":"#3a4b4f",}}>LYBUBBLE COVERAGE</Text>
            <Text style={{
                ...styles.numberCard,
                color: this.props.bg == "red" ? "#FFF":"#3a4b4f",
            }}>
                82%
            </Text>
         </View>

                    

                
                </ScrollView>

                {/* <ChartCoverage /> */}

                <View style={{width: "100%", marginBottom: 60, justifyContent: "flex-end", alignItems: "flex-end", marginLeft: 100}}>
                <TouchableOpacity
                    onPress={() => this.setState({visibleChatbot: true})}
                    style={tw` w-48 h-40`}
                    horizontal
                    >
                    <View style={styles.centered}>

                    <Image style={{
                        width: 80,
                        height: 80,
                        borderRadius: 4,
                        position: "absolute",
                        backgroundColor: "tranparent",
                        marginTop: 5,
                        marginLeft: 3
                    }} 
                    source={require('../assets/images/chatbot_icon.png')} />

                        {/* <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text> */}
                        
                    </View>
                </TouchableOpacity>
                </View>


                <ModalPopupCoverage visible={this.state.visible}>

                <TouchableOpacity onPress={() => this.setState({visible: false})}>
                    <Ionicons
                        name="close-outline"
                        size={24}
                        color="#52575D"></Ionicons>

                <Text style={{marginTop: -23, marginLeft: 80, fontSize: 16, fontWeight: "bold"}}>LYBUBBLE COVERAGE %</Text>
                </TouchableOpacity>

                    <View style={{alignItems: 'center'}}>
                    
                    <ChartCoverage />

                    </View>
          
                </ModalPopupCoverage>


                <ModalPopupChatbot visible={this.state.visibleChatbot}>

                <TouchableOpacity onPress={() => this.setState({visibleChatbot: false})} style={{marginTop: 10}}>
                    <Ionicons
                        name="close-outline"
                        size={24}
                        color="#52575D"></Ionicons>

                <Text style={{marginTop: -26, marginLeft: 80, fontSize: 16, fontWeight: "bold", marginBottom: 20}}>LYF BOT </Text>
                </TouchableOpacity>

                    
                    <ChatbotScreen />

          
                </ModalPopupChatbot>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        marginTop: 0,
        width: PAGE_WIDTH

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
        marginBottom:50
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

export default function(props) {
    const navigation = useNavigation();
  
    return <Test {...props} navigation={navigation} />;
  }