import {saveData, getData} from '../src/controller/notes';
import {storeData, retrieveData} from '../src/utils/store';
import {it, describe, expect, jest} from '@jest/globals';

jest.mock('../src/utils/store');

describe('saveData', () => {
  it('should save data', async () => {
    const note = {
      id: 1,
      content: 'test content',
      title: 'test title',
      date: new Date().toString(),
    };

    await saveData(note);

    expect(storeData).toHaveBeenCalled();
  });
});

describe('getData', () => {
  it('should get data', async () => {
    const data = [
      {id: '1', content: 'test content', title: 'test title', date: new Date()},
    ];

    (retrieveData as jest.Mock).mockReturnValueOnce(data);

    const result = await getData();

    expect(retrieveData).toHaveBeenCalled();
    expect(result).toEqual(data);
  });
});
