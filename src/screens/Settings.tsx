import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
const data = require('../assets/Data/default.json');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllGroup} from '../data.filters';
import TestContextProvider, { SampleContext } from '../context/TestContext';

interface SettingsScreenProps {
  navigation: any;
}

export default function Settings(props: SettingsScreenProps) {
  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);

  var groups = getAllGroup(data);

  var itemsP = [];

  for (var i = 0; i < groups.length; i++) {
    itemsP[i] = {label: groups[i], value: groups[i]};
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(itemsP);
  const [temp_value, setTempValue] = useState<any>(null);
  const [fav_group, setFavGroup] = useState(null);

  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem('fav_group', value);
      setFavGroup(value);
      (global as any).fav_group = value;
    } catch (e) {
      // saving error
    }
  };

  const validateData = (data: any) => {
    setVisible(false);
    storeData(data);
    (global as any).refresh = true;
  };

  useEffect(() => {
    setFavGroup((global as any).fav_group);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor={colors.background} />

      <View className="p-5" style={{marginBottom: -25, zIndex: 1000}}>
        <View
          className="p-3 flex-1 rounded-xl border-black dark:border-gray-500"
          style={[styles.container, {backgroundColor: '#bde0fe'}]}>
          <Text className="mb-2 text-4xl font-extrabold text-black">
            Paramètres
          </Text>
          <Text className="font-bold mb-3 text-xl text-black">
            Groupe favoris : {fav_group ? fav_group : 'Aucun groupe favoris'}
          </Text>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Chosir un autre groupe"
            onChangeValue={value => setTempValue(value)}
            style={[styles.container, {backgroundColor: '#a2d2ff'}]}
            dropDownContainerStyle={[
              styles.container,
              {borderTopWidth: 0, backgroundColor: '#a2d2ff'},
            ]}
            textStyle={{color: '#000000', fontSize: 16, fontWeight: 'bold'}}
          />
        </View>
      </View>
      <View className="flex-1 p-5">
        <View className="flex-row">
          <Pressable
            style={{flex: 1}}
            onPress={() =>
              temp_value && temp_value !== fav_group ? setVisible(true) : null
            }>
            <View
              className="rounded-xl flex-row justify-center items-center flex-1 p-4 border-black dark:border-gray-500"
              style={[
                styles.container,
                {
                  backgroundColor:
                    temp_value && temp_value !== fav_group
                      ? '#3CCF4E'
                      : '#808080',
                },
              ]}>
              <Image source={require('../assets/images/assets/save.png')} />
              <Text className="text-center text-4xl font-extrabold text-black">
                Enregistrer
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/** Start of modal */}
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View
            className="p-3 pt-8 pb-8 ml-3 mr-3 rounded-xl border-x-2 border-t-2 border-black border-b-4"
            style={[styles.container, {backgroundColor: '#5bc0de'}]}>
            <Text className="mb-2 text-4xl font-extrabold text-black text-center">
              Êtes-vous sûr ?
            </Text>
            <Text className="text-center font-bold mb-3 text-xl text-black">
              Ancient : {(global as any).fav_group} {'\n'}
              Nouveau : {temp_value ? temp_value : 'Aucun groupe favoris'}
            </Text>
            <View className="flex-row justify-evenly">
              <Pressable onPress={() => validateData(temp_value)}>
                <View
                  className="rounded-xl p-4 border-black dark:border-gray-500"
                  style={[styles.container, {backgroundColor: '#3CCF4E'}]}>
                  <Text className="text-xl font-extrabold text-black">OUI</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setVisible(false)}>
                <View
                  className="rounded-xl p-4 border-black dark:border-gray-500"
                  style={[styles.container, {backgroundColor: '#EB1D36'}]}>
                  <Text className="text-xl font-extrabold text-black">NON</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/** End of modal */}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
