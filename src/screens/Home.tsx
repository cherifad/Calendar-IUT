import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import CardList from '../components/CardList';

interface HomeScreenProps {
  navigation: any;
}

export default function Home(props: HomeScreenProps) {
  const {colors} = useTheme();
  const sheme = useColorScheme();
  const [refresh, setRefresh] = useReducer(x => x + 1, 0);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      if ((global as any).refresh) {
        setRefresh();
        (global as any).refresh = false;
      }      
      });
  }, []);

  return (
    <View style={{flex: 1}} key={refresh}>
      <StatusBar
        animated={true}
        backgroundColor={colors.background}
        barStyle={sheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <View style={{flex: 1}}>
        <CardList />
      </View>
    </View>
  );
}
