import React, { Component } from 'react';
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
// import { decks } from '../utils/mockData';
import { fetchDecksResults, clearDecks } from '../utils/api';

class DeckList extends Component {
  state = {
    decks: this.props.decks && this.props.decks.length > 0
      ? this.props.decks.length
      : []
  }

  componentWillUpdate() {
    console.log("COMPONENT WILL UPDATE");
    fetchDecksResults()
      .then(decks => 
        this.setState({
          decks: Object.values(decks)
        })
      )
      .catch(error => console.log("ERROR: ", error))
  }

  componentWillMount() {
    console.log("COMPONENT WILL MOUNT");
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT");
    fetchDecksResults()
      .then(decks => 
        this.setState({
          decks: Object.values(decks)
        })
      )
      .catch(error => console.log("ERROR: ", error))
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
    clearDecks();
  }

  render() {
    const columns = 2;
    return (
      <View>
        {this.state.decks.length > 0
          &&  <FlatList
                data={this.createRows(this.state.decks, columns)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={columns}
                renderItem={({ item }) => (
                  item.empty 
                    ? <View style={[styles.item, styles.itemEmpty]} />
                    : <TouchableOpacity 
                        style={styles.item}
                        onPress={() => this.props.navigation.navigate('Deck', deck={item})}>
                        <Text>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                )}
              />
        }
        <TouchableOpacity 
          style={styles.item}
          onPress={() => this.clearDecks()}>
          <Text>
            CLEAR
          </Text>
        </TouchableOpacity>
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

export default DeckList;