import React, { Component } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
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

  _swipeToNext = () => {
    let { index, total } = this.refs.swiper.state;
    if (index + 1 < total){
      this.refs.swiper.scrollBy(1);
    } else {
      index = total - 1;
    }
  }

  render() {
    const { navigation } = this.props;
    let deck = navigation.state.params.deck;
    let { qtdAndswers, qtdCorrect } = this.props.metaData;
    this.swiper = undefined;

    console.log("PROPS");
    console.log(this.props);

    const renderPagination = (index, total, context) => {
      return (
        <View style={styles.paginationStyle}>
          <Text style={[styles.paginationText, { color: 'black' }]}>
            {index + 1}/{total}
          </Text>
          {qtdAndswers === total
            &&  
              <View>
                <TouchableOpacity onPress={() => navigation.navigate(
                    'Score', 
                    { 
                      deck,
                      qtdCorrect,
                      total
                    }
                )}>
                  <Text>View Score</Text>           
                </TouchableOpacity>
              </View>
          }
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {
          deck.cards && deck.cards.length > 0
          ? 
            <View style={styles.content}>
              <Swiper 
                ref='swiper'
                showsButtons={false}
                showsPagination={true}
                renderPagination={renderPagination}
                loop={false}
              >
              {deck.cards.map((card) => {
                return (
                  <View style={styles.content} key={card.key}>
                    <Card 
                      swipeToNext={this._swipeToNext}
                      item={card} 
                      deck={deck} />
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
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  }
});

const _getDeckMetaData = (state, ownProps) => {
  let data = {
    qtdAndswers: 0,
    qtdCorrect: 0
  }
  state.decks[ownProps.navigation.state.params.deck.title].cards.map(
    card => {
      if (card.answer === card.userGuess) {
        data.qtdCorrect++
      }
      if (card.userGuess !== null){
        data.qtdAndswers++
      } 
    }
  )
  
  return data;
}


mapStateToProps = (state, ownProps) => ({
  metaData: _getDeckMetaData(state, ownProps)
});

export default connect(mapStateToProps)(Deck);