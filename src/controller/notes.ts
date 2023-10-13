// import function & type
import {retrieveData, storeData} from '../utils/store';
import {noteType, notesType} from '../utils/types';

//const key
const KEY_NOTES_LIST = 'TEST_4';

// get data
export const getData = async () => {
  const data = await retrieveData(KEY_NOTES_LIST);
  return data;
};

//save data
export const saveData = async (note: noteType) => {
  let data: notesType = (await getData()) || [];
  const editedNote = data.find(it => it.id === note.id);
  if (editedNote) {
    editedNote.content = note.content;
    editedNote.title = note.title;
    editedNote.date = note.date;
  } else {
    data = [note, ...data];
  }
  storeData(KEY_NOTES_LIST, data);
};
