import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

class Card extends Component {
  render() {
    return (
      <View>
        <Text>QUESTION</Text>
        <TouchableOpacity onPress={() => alert('YES')}>
          <Text>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('NO')}>
          <Text>NO</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Card;