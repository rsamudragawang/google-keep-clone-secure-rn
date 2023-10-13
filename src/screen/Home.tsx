/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import lib/rn
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

//import component
import NewEditor from '../components/NewEditor';
import Note from '../components/Note';
// import function
import { getData, saveData } from '../controller/notes';
import { noteType, notesType } from '../utils/types';

function Home(): JSX.Element {
  // init var
  const [notes, setNotes] = useState<notesType>([]);
  const [editor, setEditor] = useState(false)
  const [selectedNote, setSelectedNote] = useState<noteType>();
  const [search, setSearch] = useState('')

  //getdata
  useEffect(() => {
    getStoredData();
  }, []);
  const getStoredData = async () => {
    const data = await getData();
    if (data) {
      setNotes(data);
    }
  };
  // store data
  const storeData = async (item: noteType) => {
    await saveData(item)
    getStoredData()
    setEditor(false)
  }

  // function list left row
  const populateLeftRow = () => {
    const allNotes = notes?.filter(item => item.content?.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase()));
    let i = 0;
    const items = [];
    if (allNotes.length !== 0) {
      for (let index in notes) {
        let content = allNotes[index];

        const filter = content?.title !== undefined && content?.content !== undefined

        if (i % 2 === 0 && filter) {
          items.push(<Note
            key={index}
            title={content?.title}
            content={content?.content}
            date={content?.date}
            id={content?.id}
            onPress={items => { setSelectedNote(items); setEditor(true); }} />);
        }
        i++;
      }
    }

    return items;
  }

  // function list right row
  const populateRightRow = () => {
    const allNotes = notes?.filter(item => item.content?.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase()));
    let i = 0;
    const items = [];
    if (allNotes.length !== 0) {
      for (let index in notes) {
        let content = allNotes[index];
        const filter = content?.title !== undefined && content?.content !== undefined
        if (i % 2 === 1 && filter) {
          items.push(<Note
            key={index}
            title={content?.title}
            content={content?.content}
            date={content?.date}
            id={content?.id}
            onPress={items => { setSelectedNote(items); setEditor(true); }} />);
        }
        i++;
      }
    }
    return items;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {!editor &&
        <>
          <StatusBar backgroundColor={"#222222"} barStyle='light-content' />
          <View style={styles.top}>
            <TouchableOpacity>
              <Image
                source={require('../assets/menu.png')}
                style={{ height: 16, width: 16, top: 16, marginRight: 10, tintColor: '#FFF' }}
              />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={'#FFF'}
              style={styles.placeholder}
              placeholder='Search your notes'
              onChangeText={setSearch}
            />
          </View>
          <ScrollView>
            {notes?.filter(item => item.content?.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase())).length === 0 &&
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Image source={require('../assets/emptyState.png')} />

              </View>
            }
            <View style={styles.container}>
              <View style={styles.columns}>{populateLeftRow()}</View>
              <View style={styles.columns}>{populateRightRow()}</View>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.addNotesContainer} onPress={() => setEditor(true)}>
            <View>
              <Image source={require('../assets/plus.png')} style={{ height: 20, width: 20 }} />
            </View>
          </TouchableOpacity>
        </>
      }

      {editor && (
        <NewEditor
          selectedNote={selectedNote}
          onClose={() => { setEditor(false); setSelectedNote(undefined) }}
          onSave={(item) => { storeData(item); setSelectedNote(undefined) }} />)}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#222222"
  },
  top: {
    paddingLeft: 10,
    flexDirection: 'row'
  },
  placeholder: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    width: '100%'
  },
  container: {
    paddingHorizontal: 5,
    paddingTop: 10,
    flexDirection: 'row'
  },
  columns: {
    width: '50%'
  },
  addNotesContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: "#dcdcdc",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    elevation: 20
  },
});

export default Home;
