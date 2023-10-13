/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import lib/rn
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
//import types
import { noteType } from '../utils/types';

// props
interface noteProps {
  title: string
  content: string
  date: string,
  id: number,
  onPress: (node: noteType) => void;

}

function Note({ title, content, date, id, onPress }: noteProps): JSX.Element {
  return (
    <TouchableOpacity onPress={() => onPress({ id, title, date, content })} >
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardContent}>{content}</Text>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#555555",
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    height: 10,
    width: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#555555"
  },
  text: {
    color: "#FFF"
  },
  rowTextAreaUnchecked: {
    color: "#FFF"
  },
  rowTextAreaChecked: {
    color: "#989898",
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FFF"
  },
  cardContent: {
    fontSize: 14,
    color: "#FFF"
  }
  // parentView: {
  //   flex: 1,
  //   margin: 10,
  //   padding: 10,
  //   borderWidth: 1,
  //   borderBlockColor: '#000'
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // content: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // }
});

export default Note;
