import React, { Component } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EmptyDeck from './EmptyDeck';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const deckTitle = navigation.state.params.item.title;
    return {
      title: `${deckTitle}'s info`,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('NewCard', { deckKey: deckTitle })}>
          <View style={styles.newCardView}>
            <FontAwesome name='comment' style={styles.textInfo} />
            <Text style={styles.cardSubtitle}>New card!</Text>
          </View>
        </TouchableOpacity>
      )
    }
  };

  render() {
    const { navigation } = this.props;
    const deck = navigation.state.params.item;
    return (
      <View style={styles.container}>
        {
          deck.cards && deck.cards.length > 0
          ? 
            <View>
              <Text style={styles.textTitle}>
                {deck.title}
              </Text>
              <Text style={styles.textInfo}>
                {deck.cards.length} - Cards
              </Text>
              <View style={styles.playView}>
                <TouchableOpacity onPress={() => navigation.navigate('Deck', { deck: deck })}>
                  <FontAwesome name='play-circle' style={styles.startBtn} />
                  <Text>Start Quiz</Text>
                </TouchableOpacity>
              </View>
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
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  newCardView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textTitle: {
    fontSize: 50
  },  
  textInfo: {
    marginRight: 20,
    fontSize: 30,
  },
  cardSubtitle: {
    marginRight: 20,
  },
  playView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  startBtn: {
    fontSize: 60
  }
});


export default Deck;