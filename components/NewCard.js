import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { addCardToDeck } from '../utils/api';
import { addCardToDeckSuccess, addCardToDeckError } from '../actions/index';

class NewCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      question: 'Question',
      answer: 'yes',
      userGuess: null
    };
  }

  toDeck = () => {
    this.props.navigation.navigate('DeckList');
  }

  submit = () => {
    const deckKey = this.props.navigation.state.params.deckKey;
    const deck = {
      title: deckKey,
      cards: []
    }
    const card = {
      key: this.state.question,
      question: this.state.question,
      answer: this.state.answer,
      userGuess: this.state.userGuess
    };

    addCardToDeck(deck, card)
      .then(this.props.addCardToDeckSuccess(deck, card))
      .catch(error => this.props.addCardToDeckError(error));

    this.toDeck();

  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Question</Text>
        <TextInput
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <Text style={styles.text}>Answer</Text>
        <Picker
          selectedValue={this.state.answer}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({answer: itemValue})
          }>
          <Picker.Item label="YES" value="yes" />
          <Picker.Item label="NO" value="no" />
        </Picker>
        <TouchableOpacity onPress={this.submit} style={styles.button}>
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

const mapDispatchToProps = (dispatch) => ({
  addCardToDeckSuccess: (deck, card) => dispatch(addCardToDeckSuccess(deck, card)),
  addCardToDeckError: (error) => dispatch(addCardToDeckError(error))
})

export default connect(null, mapDispatchToProps)(NewCard);