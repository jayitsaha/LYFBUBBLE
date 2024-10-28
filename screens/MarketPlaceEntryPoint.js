import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabbarMarketPlace'; 

import Home from './Home';
import Explore from '../dummy_screens/Explore';
import Profile from '../dummy_screens/Profile';
import HomeScreenMarketPlace from '../src/screens/HomeScreenMarketPlace'
import UploadProduct from './UploadProduct'

const Tab = createBottomTabNavigator();

export default function MarketPlaceEntryPoint() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreenMarketPlace} options={{ title: "Buy" }} />
      <Tab.Screen name="UploadProduct" component={UploadProduct} options={{ title: "Sell" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "Cart" }}/>
    </Tab.Navigator>
  );
}

