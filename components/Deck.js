import React, { Component } from 'react';
import { View, Text, Button, Platform, TouchableOpacity } from 'react-native';

class Deck extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Card')}>
          <Text>CARD</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Deck;