import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import EmptyDeck from './EmptyDeck';
import Swiper from 'react-native-swiper';
import NewCardHeader from './NewCardHeader';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const deckTitle = navigation.state.params.deck.title;
    return {
      title: deckTitle,
      headerRight: (
        <NewCardHeader
          navigation={navigation}
          deckKey={deckTitle}
        />
      )
    }
  };

  _swipeToNext = () => {
    let { index, total } = this.refs.swiper.state;
    if (index + 1 < total) {
      this.refs.swiper.scrollBy(1);
    } else {
      index = total - 1;
    }
  }

  render() {
    const { navigation } = this.props;
    let deck = navigation.state.params.deck;
    let total = deck.cards.length;
    let { qtdAndswers, qtdCorrect } = this.props.metaData;
    this.swiper = undefined;

    const renderPagination = (index, total, context) => {
      return (
        <View style={styles.paginationStyle}>
          <Text style={[styles.paginationText, { color: 'black' }]}>
            {index + 1}/{total}
          </Text>
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
                  )
                })}
              </Swiper>
              {qtdAndswers === total
                &&
                <View style={styles.showScoreView}>
                  <TouchableOpacity onPress={() => navigation.navigate(
                    'Score',
                    {
                      deck,
                      qtdCorrect,
                      total
                    }
                  )}>
                    <Text style={styles.showScoreText}>
                      View Score {` `}
                      <MaterialCommunityIcons style={styles.showScoreIcon} name='bullseye-arrow' />
                    </Text>
                  </TouchableOpacity>
                </View>
              }
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
  showScoreView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '10%',
  },
  showScoreText: {
    fontSize: 20,
    color: 'slategray'
  },
  showScoreIcon: {
    fontSize: 20
  },
  paginationStyle: {
    position: 'absolute',
    top: 5,
    right: 8
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
      card.answer === card.userGuess && data.qtdCorrect++;
      card.userGuess !== null && data.qtdAndswers++;
    }
  )

  return data;
}


mapStateToProps = (state, ownProps) => ({
  metaData: _getDeckMetaData(state, ownProps)
});

export default connect(mapStateToProps)(Deck);