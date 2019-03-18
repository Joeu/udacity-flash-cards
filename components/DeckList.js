import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Deck from './Deck';

class DeckList extends Component {
  render() {
    return (
      <View>
        <Text>Deck List</Text>
        <Deck></Deck>
      </View>
    )
  }
}

export default DeckList;