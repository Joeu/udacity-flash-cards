import React, { Component } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Card from './Card';
import EmptyDeck from './EmptyDeck';
import Swiper from 'react-native-swiper';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const deckTitle = navigation.state.params.deck.title;
    return {
      title: deckTitle,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('NewCard', { deckKey: deckTitle })}>
          <FontAwesome name='comment' style={styles.newCardButton} />
        </TouchableOpacity>
      )
    }
  };

  render() {
    const { navigation } = this.props;
    const deck = navigation.state.params.deck;
    return (
      <View style={styles.container}>
        {
          deck.cards && deck.cards.length > 0
          ? 
            <View style={styles.content}>
              <Swiper 
                showsButtons={false}
                showsPagination={true}
              >
              {deck.cards.map((card) => {
                return (
                  <View style={styles.content} key={card.key}>
                    <Card item={card} deck={deck} />
                  </View>
                )})}
              </Swiper>
            </View>
          : <EmptyDeck />
        }
      </View>
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
  content: {
    flex: 1,
    width: '100%',
  },
  newCardButton: {
    marginRight: 20,
    fontSize: 30
  }
});


export default Deck;