import { Feather } from "@expo/vector-icons";
import React, { useEffect } from 'react';

export const icon = {
  Home: (props: any) => <Feather name="home" size={24} {...props} />,
  PedestrianDashboard: (props: any) => <Feather name="compass" size={24} {...props} />,
  Profile: (props: any) => <Feather name="user" size={24} {...props} />,
};
