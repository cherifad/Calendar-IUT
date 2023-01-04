import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StatusBar, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function About() {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor={colors.background} />

      <ScrollView className="p-5">
        <View
          className="p-5 flex-row justify-evenly items-center mb-5 rounded-xl border-x-2 border-t-2 border-black border-b-4"
          style={styles.container}>
          <View className="justify-center">
            <Image source={require('../assets/images/Background/logo.png')} />
          </View>
          <View>
            <Text className="text-4xl font-extrabold text-black">À Propos</Text>
          </View>
        </View>
        <View
          className="p-5 mb-5 rounded-xl border-x-2 border-t-2 border-black border-b-4"
          style={styles.container}>
          <Text className="text-4xl font-extrabold text-black">Outils</Text>
          <View className="flex-row mt-2 justify-evenly items-center">
            <View className="justify-center">
              <Image
                source={require('../assets/images/assets/React-icon.png')}
                style={{
                  width: 91,
                  height: 80,
                }}
              />
            </View>
            <View>
              <Text className="text-xl font-semibold text-black">
                👉 React Native {'\n'}
                👉 Tailwind CSS {'\n'}
                👉 TypeScript {'\n'}
                👉 YouTube
              </Text>
            </View>
          </View>
        </View>
        <View
          className="p-5 mb-5 rounded-xl border-x-2 border-t-2 border-black border-b-4"
          style={styles.container}>
          <Text className="text-4xl font-extrabold text-black">Données</Text>
          <View className="flex-row mt-2 justify-evenly items-center">
            <View className="justify-center">
              <Image
                source={require('../assets/images/assets/Python-icon.png')}
                style={{
                  width: 80,
                  height: 91,
                }}
              />
            </View>
            <View>
              <Text className="text-xl font-semibold text-black">
                👉 ICS.py {'\n'}
                👉 Json {'\n'}
                👉 Firestore {'\n'}
                👉 YouTube
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-evenly">
          <View
            className="p-3 rounded-xl border-x-2 border-t-2 border-black border-b-4"
            style={styles.container}>
            <Image
              source={require('../assets/images/assets/GitHub-icon-dark.png')}
              style={{width: 40, height: 40}}
            />
          </View>
          <View
            className="p-3 rounded-xl border-x-2 border-t-2 border-black border-b-4"
            style={styles.container}>
            <Image
              source={require('../assets/images/assets/mail.png')}
              style={{width: 40, height: 40}}
            />
          </View>
          <View
            className="p-3 rounded-xl border-x-2 border-t-2 border-black border-b-4"
            style={styles.container}>
            <Image
              source={require('../assets/images/assets/web.png')}
              style={{width: 40, height: 40}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopWidth: 2.5,
    borderBottomWidth: 4.5,
    backgroundColor: '#d7c9d1',
  },
});
