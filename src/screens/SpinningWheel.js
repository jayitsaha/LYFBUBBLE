import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import Spacing from "../../constants/Spacing";
import useColors from "../../hooks/useColors";
import { useNavigation } from "@react-navigation/native";

import WheelOfFortune from 'react-native-wheel-of-fortune';

const participants = [
  'STARBUCKS       ',
  'FREE BURGER           ',
  'EXTRA DAY         ',
  '$15 GRAB           ',
  'ROOM UPGRADE          ',
  '10% NEXT STAY         ',
  'KRISPY KREME         ',
  'HARD LUCK        ',
];
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
    };
    this.child = null;
  }

  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 30,
      borderWidth: 5,
      borderColor: '#fff',
      innerRadius: 30,
      duration: 6000,
      backgroundColor: 'transparent',
      textAngle: 'horizontal',
      knobSource: require("../../assets/images/knob.png"),
      onRef: ref => (this.child = ref),
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />

        <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.padding.base,
        marginTop: 20
      }}
    >
      
      
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 70,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          LYFREWARDS
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
                source={require('../../assets/images/gold_coin.webp')} />
                
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#222", marginLeft: 20 }}>
                {300}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({winnerValue: value, winnerIndex: index});
          }}
        />
        {!this.state.started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Spin to win!</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              {participants[this.state.winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({winnerIndex: null});
                this.child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN NEXT TIME</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee13f'
  },
  startButtonView: {
    position: 'absolute',
    top: 360
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 30,
    justifyContent: "center",
    textAlign: "center",
    marginLeft: 60,
    flexWrap: "wrap"
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginRight: 10
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});