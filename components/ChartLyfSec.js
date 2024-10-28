import React, {Component} from 'react';
import {View,Dimensions} from 'react-native'
import {LineChart } from 'react-native-chart-kit'

export default class Chart extends Component{
    render(){
        return(
            <View style={{
//                marginHorizontal:20,
                marginTop:35,
                marginLeft: -35
            }}>
               <LineChart

//                    withHorizontalLabels={false}
                    data={{
                        labels:["mon","tue","wed","thu", "fri", "sat", "sun"],
                        datasets: [
                            {
                                data: [
                                    1, 12, 7, 5, 3, 2, 1 
                                ],
                            },
                        ],
                    }}
                    width={400}
                    height={200}
                    yAxisInterval={2}
                    chartConfig={{
                        backgroundColor:"#FFF",
                        backgroundGradientFrom:"#FFF",
                        backgroundGradientTo:"#FFF",
                        decimalPlaces:2,
                        color:(opacity = 0) => `rgba(210, 200, 190, 1.0)`,
                        labelColor:(opacity = 0) => `rgba(59,34,138, ${opacity})`,
                        style:{
                            borderRadius:16
                        },
                        propsForDots:{
                            r:'6',
                            strokeWidth:"2",
                            stroke:"rgba(150, 140, 130, 1.0)"
                        },
                    }}
                    bezier
                    style={{
                        marginVertical:8,
                        borderRadius:16
                    }}
                    
               />
            </View>
        )
    }
}