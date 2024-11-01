import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Entypo';
import TextAvatar from './textAvatar';

const Header = () => {
  return (
    <View style={style.row}>
      <Icons name="menu" size={30} color="black" />
      <Text> Search Tasks </Text>
      <TextAvatar text="J" color="#EAE8F3" />
    </View>
  );
};

export default Header;

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});