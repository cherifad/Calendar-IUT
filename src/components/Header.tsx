import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Header = (props: any) => {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor={colors.background} />

      <View>
        <Text style={{color: colors.text}} className="pl-6 pr-6 mt-20 text-5xl">
          {props.text}
        </Text>
        <Text style={{color: colors.text}} className="pl-6 pr-6 text-lg">
          {props.subText}
        </Text>
      </View>
    </View>
  );
}

export default Header;
