/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface HeaderProps {
  onPress: () => void;
}

function Header({ onPress }: HeaderProps): JSX.Element {
  return (
    <View style={styles.headerRow}>
      <Text
        style={[
          styles.header

        ]}>
        Secure Notes
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.navButton}>
        <Text style={styles.createText}>Create</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: '700',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  createText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'brown',
  },
});

export default Header;
