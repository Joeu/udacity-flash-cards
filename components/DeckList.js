import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

class DeckList extends Component {
  render() {
    return (
      <View>
        {/* Display Decks retrieved */}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck')}>
          <Text style={styles.btn}>Deck</Text>
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
    // backgroundColor: '#000000',
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DeckList;