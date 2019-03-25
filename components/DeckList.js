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
import { decks } from '../utils/mockData';

class DeckList extends Component {
  state = {
    decks: []
  }

  componentDidMount() {
    this.setState({
      decks: decks
    })
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