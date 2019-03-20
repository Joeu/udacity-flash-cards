import React, { Component } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Card from './Card';
import Swiper from 'react-native-swiper';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const deckTitle = navigation.state.params.item.title;
    return {
      title: deckTitle,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('NewCard')}>
          <FontAwesome name='comment' size={30} />
        </TouchableOpacity>
      )
    }
    
  };

  render() {
    const { navigation } = this.props;
    const deck = navigation.state.params.item
    return (
      <Swiper showsButtons={true}>
        {deck.cards 
          &&  deck.cards.map((card) => {
                return (
                  <View key={card.key}>
                    <Card item={card} />
                  </View>
                )
              })
        }
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