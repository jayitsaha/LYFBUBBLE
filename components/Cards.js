import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native'
import Icon2 from '@expo/vector-icons/MaterialCommunityIcons'
import Icon from '@expo/vector-icons/Ionicons'
import {TouchableOpacity} from 'react-native-gesture-handler'

export default class Cards extends Component{
    render(){
        return(
         <View style={{
            ...styles.container, 
            backgroundColor:this.props.bg == "red" ? this.props.bg: this.props.bg
         }}>
            <View style={styles.col}>
               <Icon 
                 name={this.props.icon}
                 size={30}
                 color={this.props.bg == "red" ? this.props.iconbg:this.props.iconbg}
               />
               <TouchableOpacity onPress={this.props.onPress}>
                    <Icon2
                        style={{marginLeft:50}}
                        name="dots-vertical"
                        size={30}
                        color="#b8b8aa"
                    />
               </TouchableOpacity>
            </View>
             <Text style={{...styles.title,
             color: this.props.bg == "red" ? "#FFF":"#3a4b4f",}}>{this.props.title}</Text>
            <Text style={{
                ...styles.number,
                color: this.props.bg == "red" ? "#FFF":"#3a4b4f",
            }}>
                {this.props.number}
            </Text>
         </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
    height:220,
    width:130,
    borderRadius:30,
    padding:15,
    marginLeft:20,
    borderRadius: 20,
    borderColor: "black"

  },
  col: {
      flexDirection:"row"
  },
  title:{
      marginTop:90,
      color:"#b8b8aa",
      fontWeight:"bold",
      fontSize:12
  },
  number:{
      fontWeight:'bold',
      fontSize:22
  }
})