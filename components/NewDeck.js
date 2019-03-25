import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createDeck, fetchDecksResults } from '../utils/api';

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {title: 'Title'};
  }

  toHome = () => {
    this.props.navigation.navigate('DeckList', {decks: fetchDecksResults()});
  }

  submit = () => {
    const key = this.state.title;
    const deck = {
      title: this.state.title,
      cards: []
    }

    createDeck({ key, deck });

    this.toHome();
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Deck Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <TouchableOpacity onPress={this.submit}  style={styles.button}>
          <Text>CREATE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  text: {
    textAlign: 'center',
    color: '#000080',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    padding: 15
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default NewDeck;