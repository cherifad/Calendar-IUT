import React, {useEffect, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import Home from './screens/Home';
import Settings from './screens/Settings';
import About from './screens/About';
import Food from './screens/Food';
import SplashScreen from './screens/Spash.Screen';
import {Constants} from './styles';
import {useColorScheme, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BackgroundImage} from './assets/images/Background/image.picker';

const Tab = createBottomTabNavigator();

const {Navigator, Screen} = createStackNavigator();
const DARK_THEME = Constants.DARK_THEME;
const LIGHT_THEME = Constants.LIGHT_THEME;

export default function AppNavigation(props: any) {
  const sheme = useColorScheme();

  const viewRef = useRef<any>(null);

  return (
    <NavigationContainer theme={sheme === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <Tab.Navigator
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          gestureEnabled: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 10,
            right: 10,
            elevation: 0,
            backgroundColor: '#fab32f',
            borderRadius: 15,
            height: 90,
            borderLeftWidth: 2.5,
            borderRightWidth: 2.5,
            borderTopWidth: 2.5,
            borderBottomWidth: 4.5,
            borderColor: 'black',
            zIndex: 1000,
          },
          tabBarIcon: ({focused}) => {
            let iconName = 'default';
            if (route.name === 'Home') {
              iconName = focused ? 'home_focused' : 'home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings_focused' : 'settings';
            } else if (route.name === 'About') {
              iconName = focused ? 'about_focused' : 'about';
            } else {
              iconName = focused ? 'food_focused' : 'food';
            }
            return (
                <Image
                  source={BackgroundImage.GetImage(iconName)}
                  style={styles.icon}
                />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Test" component={Food} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
});
