import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

class NewDeck extends Component {
  render() {
    return (
      <View>
        <Text style={styles.btn}>New Deck</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    textAlign: 'center',
    color: '#000080'
  }
});

export default NewDeck;