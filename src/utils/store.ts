//import lib
import EncryptedStorage from 'react-native-encrypted-storage';

// save data func
export const storeData = async (key: string, data: any) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('Error store', error);
  }
};

// get data func
export const retrieveData = async (key: string) => {
  try {
    const data = await EncryptedStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log('Error retrieve', error);
  }
};
