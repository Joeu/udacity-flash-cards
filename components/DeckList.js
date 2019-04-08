import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { fetchDecks, clearDecks, deleteDeck } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }

  clearDecks = () => {
    this.props.clearDecks();
  }

  deleteDeck = (deckKey) => {
    console.log("DECKLIST: ", deckKey);
    this.props.deleteDeck(deckKey);
  }

  render() {
    const columns = 1;
    return (
      <View>
        {this.props.decks && this.props.decks.length > 0
          &&  <FlatList
                data={this.props.decks}
                keyExtractor={(item, index) => index.toString()}
                numColumns={columns}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                      <TouchableOpacity style={styles.cardButtom}
                        onPress={() => this.props.navigation.navigate('DeckInfo', deck = { item })}>
                        <View>
                          <FontAwesome style={styles.btnIcon} name='book' />
                        </View>
                        <View>
                          <Text style={styles.btnText}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deleteButton}
                        onPress={() => this.deleteDeck(item.title)}>
                        <View>
                          <FontAwesome style={styles.btnIcon} name='trash' />
                        </View>
                      </TouchableOpacity>
                  </View>
                )}
              />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardButtom: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1,
    width: '70%',
    height: 100
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: '30%',
    height: 100,
  },
  btnText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  btnIcon: {
    fontSize: 50
  },
  item: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "transparent",
    flexGrow: 1,
    flexDirection: 'row',
    margin: 4,
    flexBasis: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFA500',
    height: 100
  },
});

const mapStateToProps = state => ({
  decks: state && state.decks && Object.values(state.decks)
})

const mapDispatchToProps = dispatch => ({
  fetchDecks: () => dispatch(fetchDecks()),
  clearDecks: () => dispatch(clearDecks()),
  deleteDeck: (deckKey) => dispatch(deleteDeck(deckKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);