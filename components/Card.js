import React, { Component } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

class Card extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>{this.props.item.question}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => alert('YES')}>
            <FontAwesome name='check-circle' size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('NO')}>
            <FontAwesome name='times-circle' size={30} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center'
  },
  questionText: {
    fontSize: 30,
    textAlign: 'center'
  }
});

export default Card;