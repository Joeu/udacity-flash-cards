import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';

class Deck extends Component {
  
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
      onPress={() => navigation.navigate('NewCard')}
        title="+ Card"
        color="#000"
      />
    )
  });

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Card')}>
          <Text>Question 1</Text>
          <Card />
          <Text>Question 2</Text>
          <Card />
          <Text>Question 3</Text>
          <Card />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  }
});


export default Deck;