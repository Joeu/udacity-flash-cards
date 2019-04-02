import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  SearchBar, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator
} from 'react-native';
import { fetchDecks, clearDecks, deleteDeck } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }

  createRows = (data, columns) => {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;
    while (lastRowElements !== columns) {
      data.push({
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true
      });
      lastRowElements += 1;
    }
    return data;
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
        <TouchableOpacity 
          style={styles.item}
          onPress={() => this.clearDecks()}>
          <Text>
            CLEAR
          </Text>
        </TouchableOpacity>
        {this.props.decks && this.props.decks.length > 0
          &&  <FlatList
                data={this.createRows(this.props.decks, columns)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={columns}
                renderItem={({ item }) => (
                  item.empty 
                    ? <View style={[styles.item, styles.itemEmpty]} />
                    : <View style={styles.item}>
                        <TouchableOpacity 
                          onPress={() => this.props.navigation.navigate('Deck', deck={item})}>
                          <Text>
                            {item.title}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.deleteDeck(item.title)}>
                          <Text>
                            DELETE DECK
                          </Text>
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
  item: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    flexBasis: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFA500',
    height: 100
  },
  itemEmpty: {
    backgroundColor: "transparent",
    borderWidth: 0,
  }
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