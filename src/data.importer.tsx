import AsyncStorage from '@react-native-async-storage/async-storage';

{
  /** To store data in the local storage */
}
const storeData = async (
  value: any,
  key: string,
  setAsGlobal: boolean,
  globalDataName?: any | null,
  json?: boolean,
) => {
  try {
    if (json) {
        value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
    if (setAsGlobal) {
      globalDataName = value;
    }
  } catch (e) {
    console.error(e);
  }
};

{
  /** To get the data from the local storage */
}
const getData = async (
  key: string,
  jsonify: boolean,
  globalDataName?: any | undefined,
) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      if (jsonify && globalDataName) {
        globalDataName = JSON.parse(value);
      } else if (globalDataName) {
        globalDataName = value;
      }
      return jsonify ? JSON.parse(value) : value;
    }
  } catch (e) {
    console.error(e);
  }
};

export {storeData, getData};
