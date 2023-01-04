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
  Text,
  Dimensions
} from 'react-native';
import {useTheme} from '@react-navigation/native';
const globalData = require('../assets/Data/default.json');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getEdtFromGroup,
  sortByDate,
  getOneWeek,
  getSeparatedDays,
} from '../data.filters';
import StudyCard from '../components/Card';
import {getData} from '../data.importer';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

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
    tempData = getSeparatedDays(tempData);
    setLoading(false);
  }

  useEffect(() => {
    const temp = getData('fav_group', false);
    temp.then(value => {
      setFavGroup(value);
    })
    .catch(error => {
      console.error("CardList.tsx : " + error);
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          horizontal={true}
          renderItem={({item}) => (
            <View style={{width: width}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                extraData={item}
                data={item}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => {
                  return (
                    <TouchableWithoutFeedback
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
                          showDate={false}
                        />
                      </Animated.View>
                    </TouchableWithoutFeedback>
                  );
                }}
              />
              ;
            </View>
          )}
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
