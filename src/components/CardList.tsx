import {useEffect, useState} from 'react';
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
const globalData = require('../assets/Data/default.json');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getEdtFromGroup, sortByDate, getOneWeek} from '../data.filters';
import StudyCard from './Card';
import {getData} from '../data.importer';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

const CardList = () => {
  const {colors} = useTheme();
  const [isLoading, setLoading] = useState<any>(true);
  const [data, setData] = useState<any>([]);
  const [fav_group, setFavGroup] = useState('');

  var dateList: any[] = [];

  function checkExist(date: any) {
    if (dateList.includes(date)) {
      return false;
    } else {
      dateList.push(date);
      return true;
    }
  }

  async function retrieveData() {
    var tempData = getEdtFromGroup(globalData, fav_group);
    tempData = sortByDate(tempData);
    tempData = getOneWeek(tempData, 7);
    setData(tempData);
    setLoading(false);
  }

  useEffect(() => {
    getData('fav_group', false).then(value => {
      setFavGroup(value);
    });
    retrieveData();
  }, [fav_group, (global as any).data]);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  return (
    <SafeAreaView style={{height: '100%'}}>
      {!isLoading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          extraData={data}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableWithoutFeedback key={index.toString()}
                onPress={() => {
                  console.log('pressed');
                  rotation.value = withSequence(
                    withTiming(-10, {duration: 50}),
                    withRepeat(withTiming(12, {duration: 100}), 6, true),
                    withTiming(0, {duration: 50}),
                  );
                }}>
                <Animated.View style={animatedStyle}>
                  <StudyCard
                    theme={colors}
                    start={new Date(item.begin)}
                    end={new Date(item.end)}
                    name={item.name}
                    place={item.location}
                    prof={item.prof}
                    group={(global as any).fav_group}
                    color={item.color}
                    showDate={checkExist(new Date(item.begin).getUTCDate())}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      ) : (
        <ActivityIndicator
          size={'large'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CardList;
