import React, { Component } from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EmptyDeck from './EmptyDeck';
import NewCardHeader from './NewCardHeader';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const deckTitle = navigation.state.params.item.title;
    return {
      title: `${deckTitle}'s info`,
      headerRight: (
        <NewCardHeader 
          navigation={navigation}
          deckKey={deckTitle}
        />
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
  textTitle: {
    fontSize: 50
  },  
  textInfo: {
    marginRight: 20,
    fontSize: 30,
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