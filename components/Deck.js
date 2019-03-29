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
        <TouchableOpacity onPress={() => navigation.navigate('NewCard', {deckKey: deckTitle})}>
          <FontAwesome name='comment' style={styles.newCardButton} />
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
                  <View style={styles.container} key={card.key}>
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
  container: {
    flex: 1,
    backgroundColor: '#f000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newCardButton: {
    marginRight: 20,
    fontSize: 30
  }
});


export default Deck;