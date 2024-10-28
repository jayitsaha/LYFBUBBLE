import {View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import Header from './header';
// import Card from './card';
import Swipable from './swipableLyfeSec';
import {FlatList} from 'react-native-gesture-handler';
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import HorizontalItems, {HorizontalItem} from "./HorizontalItems";
import {Categories, News, NewsListLyfSec, ItemList} from "../data";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Font from "../constants/Font";
import useColors from "../hooks/useColors";
import {useNavigation} from "@react-navigation/native";
import Page, { PAGE_WIDTH } from './Page';
import Dot from "./DotNotification";
import HorizontalNewsList from "./HorizontalNewsList";
import Cards from './Cards';
import { ScrollView }
    from 'react-native-gesture-handler'
    import Icons from "@expo/vector-icons/MaterialIcons";
    import CustomHeaderLyfSec from './CustomHeaderLyfSec'

const data = [
  {
    title: 'foodpanda',
    subTitle: 'Tk. 70 off home made meals! ',
    avatarText: 'F',
    avatarColor: '#219F94',
    description: 'Lorem Ipsum is simply dummy text of the printing and typese',
  },

];

const AcceptReject = () => {
  const colors = useColors();
  return (
    <>
      <SafeAreaView style={style.container}>
        <View style={{paddingHorizontal: 10, paddingTop: 40}}>
          <CustomHeaderLyfSec />
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <>
                <Swipable backgroundColor={item.avatarColor}>
                
                </Swipable>
              </>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default AcceptReject;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

