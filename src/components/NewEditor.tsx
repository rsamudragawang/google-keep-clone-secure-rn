/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


// import lib/rn
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';

//import function
import { getData } from '../controller/notes';
import { noteType } from '../utils/types';

// Props
interface EditorProps {
  selectedNote?: noteType;
  onSave: (note: noteType) => void;
  onClose: () => void;
}

const NewEditor = ({ onSave, onClose, selectedNote }: EditorProps): JSX.Element => {
  // init var
  const [id, setId] = useState(0)
  const [title, setTitle] = useState(selectedNote?.title);
  const [note, setNote] = useState(selectedNote?.content);
  const refNote = useRef<TextInput>(null);

  // get data
  useEffect(() => {
    getStoredData();
  }, []);
  const getStoredData = async () => {
    const data = await getData() || [];
    setId(selectedNote?.id !== undefined ? selectedNote?.id : data.length + 1)
  };
  // set function back
  BackHandler.addEventListener('hardwareBackPress', function () {
    if (title && note) {
      onSave({
        id,
        title: title,
        content: note,
        date: Date.now().toString()
      });
      return true
    } else {
      onClose()
      return true
    }
  });
  return (

    <View style={styles.safeArea}>
      <StatusBar backgroundColor={"#222222"} barStyle='light-content' />
      <View style={styles.topbarContainer}>
        <TouchableOpacity onPress={() => {
          if (title && note) {
            onSave({
              id,
              title: title,
              content: note,
              date: Date.now().toString()
            });
          } else {
            onClose()
          }
        }
        }>
          <View style={styles.button}>
            <Image source={require('../assets/back-arrow.png')} style={{ height: 16, width: 16 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleTextArea}
          value={title}
          placeholderTextColor={'#FFF'}
          placeholder="Title"
          onChangeText={setTitle}
          onEndEditing={() => {
            refNote.current?.focus();
          }}
        />
      </View>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleTextArea}
          ref={refNote}
          placeholderTextColor={'#FFF'}
          placeholder="Note"
          multiline
          numberOfLines={15}
          underlineColorAndroid="transparent"
          textAlignVertical="top"
          value={note}
          onChangeText={setNote}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    height: '100%',
    backgroundColor: "#222222"
  },
  titleContainer: {
    paddingHorizontal: 10
  },
  titleTextArea: {
    color: "#989898",
    fontSize: 18,
    paddingHorizontal: 15
  },
  topbarContainer: {
    height: 40,
    justifyContent: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40
  },
});

export default NewEditor;
