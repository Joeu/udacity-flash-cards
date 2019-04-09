import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { addCardToDeck } from '../utils/api';
import { addCardToDeckSuccess, addCardToDeckError } from '../actions/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class NewCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      question: '',
      answer: 'yes',
      userGuess: null,
      placeholder: 'Type here your question'
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

  _clear = () => {
    this.setState({
      key: '',
      question: '',
      answer: 'yes',
      userGuess: null
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Question</Text>
        <TextInput
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          placeholder={this.state.placeholder}
          multiline={true}
          numberOfLines={10}
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
        <TouchableOpacity 
          disabled={this.state.question === ''}
          onPress={this.submit} 
          style={styles.button}>
          <MaterialCommunityIcons 
            name='library-plus' 
            style={styles.newCardButton} />
          <Text>CREATE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    alignItems: 'center',
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
    borderColor: 'gray', 
    borderWidth: 1,
    width: '80%',
    textAlignVertical: 'top'
  },
  newCardButton: {
    fontSize: 45,
    color: 'slategray'
  }
});

const mapDispatchToProps = (dispatch) => ({
  addCardToDeckSuccess: (deck, card) => dispatch(addCardToDeckSuccess(deck, card)),
  addCardToDeckError: (error) => dispatch(addCardToDeckError(error))
})

export default connect(null, mapDispatchToProps)(NewCard);