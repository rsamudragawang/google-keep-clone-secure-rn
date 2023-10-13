import {storeData, retrieveData} from '../src/utils/store';
import EncryptedStorage from 'react-native-encrypted-storage';
import {it, describe, expect, jest} from '@jest/globals';
import 'jest';

jest.mock('react-native-encrypted-storage');

describe('storeData', () => {
  it('should store data', async () => {
    const key = 'testKey';
    const data = {test: 'testData'};

    await storeData(key, data);

    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(data),
    );
  });
});

describe('retrieveData', () => {
  it('should retrieve data', async () => {
    const key = 'testKey';
    const data = null;

    const result = await retrieveData(key);
    expect(EncryptedStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(data);
  });
});
