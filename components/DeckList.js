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
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
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
                          <MaterialCommunityIcons style={styles.btnIcon} name='cards-outline' />
                        </View>
                        <View>
                          <Text style={styles.btnText}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.separator} />
                      <TouchableOpacity style={styles.deleteButton}
                        onPress={() => this.deleteDeck(item.title)}>
                        <View>
                          <FontAwesome style={styles.deleteIcon} name='trash' />
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '70%',
    height: 100,
    paddingLeft: 20
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 100,
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: '#FFA500',
    height: 90
  },
  btnText: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingLeft: 5,
    color: 'slategray'
  },
  btnIcon: {
    fontSize: 50,
    color: 'royalblue'
  },
  deleteIcon: {
    fontSize: 50,
    color: 'orangered'
  },
  item: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "transparent",
    flexGrow: 1,
    flexDirection: 'row',
    margin: 4,
    flexBasis: 0,
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