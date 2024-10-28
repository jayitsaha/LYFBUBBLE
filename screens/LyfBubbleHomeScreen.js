import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/Tabbar'; 

import Home from './Home';
import Explore from '../dummy_screens/Explore';
import Profile from '../dummy_screens/Profile';
import PedestrianDashboard from './PedestrianDashboard'

const Tab = createBottomTabNavigator();

export default function LyfBubbleHomeScreen() {
  return (
    <Tab.Navigator 
      tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="PedestrianDashboard" component={PedestrianDashboard} options={{ title: "LyFGuard" }}/>
      <Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "LyFMart" }}/>
    </Tab.Navigator>
  );
}

