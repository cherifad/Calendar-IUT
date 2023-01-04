import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Linking,
} from 'react-native';
const globalData = require('../assets/Data/food.json');
import {getLastUpdatedDate, getAllFood, getFromCurrentDate} from '../food.filters';
import FoodCard from '../components/FoodComponents';
import {FlatList} from 'react-native-gesture-handler';

export default function Food() {
  const [lastUpdated, setLastUpdated] = React.useState('');
  const [data, setData] = useState<any>([]);

  const dateArray: any = [];

  function sameDate(date: string) {
    if (dateArray.includes(date)) {
      return false;
    } else {
      dateArray.push(date);
      return true;
    }
  }

  const today = new Date();

  useEffect(() => {
    setLastUpdated(getLastUpdatedDate(globalData));
    setData(getFromCurrentDate(globalData, today));
  }, []);

  return (
    <View className="p-5">
      {/** Header -- Infos */}
      <View
        className="p-5 flex-row items-center rounded-xl border-x-2 border-t-2 border-black border-b-4"
        style={[styles.container, {backgroundColor: '#bde0fe'}]}>
        <View className="mr-2">
          <Image source={require('../assets/images/Background/about.png')} />
        </View>
        <View>
          <Text className="mb-2 italic">
            Dernière mise à jour le{' '}
            {new Date(lastUpdated).getUTCDate().toString() +
              '/' +
              (new Date(lastUpdated).getUTCMonth() + 1) +
              '/' +
              new Date(lastUpdated).getUTCFullYear()}{' '}
            à
          </Text>
          <View className="flex-row items-end">
            <Text className="text-4xl font-extrabold text-black">
              {new Date(lastUpdated).getUTCHours() +
                'h' +
                new Date(lastUpdated).getUTCMinutes()}
            </Text>
            <Text className="mb-2 ml-2 italic">
              ... et {new Date(lastUpdated).getSeconds()} seconde(s)
            </Text>
          </View>
        </View>
      </View>
      {/** Header -- Infos */}

      {/** Contents -- Cards */}
      {data.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          extraData={data}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View>
                <FoodCard
                  date={new Date(item.date)}
                  day={item.Jour}
                  moment={item.Moment}
                  Type={item.Type}
                  plats={item.Plats}
                  sameDate={sameDate(item.date)}
                />
                <Text>{item.index}</Text>
              </View>
            );
          }}
        />
      ) : (
        <View>
          <View
            className="p-5 flex-row items-center mb-5 mt-5 rounded-xl border-x-2 border-t-2 border-black border-b-4"
            style={[styles.container, {backgroundColor: "#e63946"}]}>
            <View className="justify-center mr-2">
              <Image source={require('../assets/images/Background/warning.png')} />
            </View>
            <View>
              <Text className="text-4xl font-extrabold text-black">
                Aucune donnée disponible
              </Text>
            </View>
          </View>
          <View>
            <Pressable
              onPress={() =>
                Linking.openURL(
                  'https://www.crous-grenoble.fr/restaurant/ru-dannecy/',
                )
              }>
              <View
                className="rounded-xl flex-row justify-center items-center flex-1 p-4 border-black dark:border-gray-500"
                style={[styles.container, {backgroundColor: '#3CCF4E'}]}>
                <Text className="text-center text-4xl font-extrabold text-black">
                  Voir sur le site
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}

      {/** Contents -- Cards */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopWidth: 2.5,
    borderBottomWidth: 4.5,
  },
});
