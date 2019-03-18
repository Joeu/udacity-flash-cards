import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Deck from './Deck';

class DeckList extends Component {
  render() {
    return (
      <View>
        {/* Display Decks retrieved */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck')}>
          <Text style={styles.btn}>Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewDeck')}>
          <Text style={styles.btn}>New Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    textAlign: 'center',
    color: '#000080',
    padding: 10,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DeckList;