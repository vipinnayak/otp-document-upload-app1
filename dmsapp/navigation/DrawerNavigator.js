import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UploadScreen from '../screens/UploadScreen';
import SearchScreen from '../screens/SearchScreen';
import PreviewScreen from '../screens/PreviewScreen';
import HomeScreen from '../screens/HomeScreen'; // 👇 simple welcome screen

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Upload" component={UploadScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Preview" component={PreviewScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
