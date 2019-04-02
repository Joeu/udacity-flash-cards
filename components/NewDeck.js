import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addDeckSuccess, addDeckError } from '../actions/index';

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {title: 'Title'};
  }

  toHome = () => {
    this.props.navigation.navigate('DeckList');
  }

  submit = () => {
    const key = this.state.title;
    const deck = {
      title: this.state.title,
      cards: []
    }

    createDeck({ key, deck })
      .then(this.props.addDeckSuccess({
        [key]: deck
      }))
      .catch(error => this.props.addDeckError(error));

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

const mapDispatchToProps = (dispatch) => ({
  addDeckSuccess: (deck) => dispatch(addDeckSuccess(deck)),
  addDeckError: (deck) => dispatch(addDeckError(deck))
})

export default connect(null, mapDispatchToProps)(NewDeck);