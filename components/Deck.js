import React, { Component } from 'react';
import { View, Text, Button, Platform, TouchableOpacity } from 'react-native';

class Deck extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: 'TEST',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };
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