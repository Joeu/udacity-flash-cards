import React, { Component } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Card from './Card';
import Swiper from 'react-native-swiper';

const cardsData = [
  {key: 1, question: 'Is 1 a letter?', answer: 'no'},
  {key: 2, question: 'Is B a letter?', answer: 'yes'},
  {key: 3, question: 'Is 3 a letter?', answer: 'no'},
  {key: 4, question: 'Is D a letter?', answer: 'yes'},
  {key: 5, question: 'Is 5 a letter?', answer: 'no'}
]

class Deck extends Component {
  state = {
    data: cardsData
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('NewCard')}>
        <FontAwesome name='comment' size={30} />
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <Swiper showsButtons={true}>
        {this.state.data.map((card) => {
          return (
            <View key={card.key}>
              <Card item={card} />
            </View>
          )
        })}
      </Swiper>
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