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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render() {
    return (
      <View>
        {this.state.decks.length > 0
          &&  <FlatList
                data={this.state.decks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate('Deck', deck={item})}>
                    <Text>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    textAlign: 'center',
    color: '#000080',
    padding: 10,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DeckList;