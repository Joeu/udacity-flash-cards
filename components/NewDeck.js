import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { createDeck } from '../utils/api';
import { connect } from 'react-redux';
import { addDeckSuccess, addDeckError } from '../actions/index';

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      placeholder: 'Insert the Deck title'
    };
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

  _clear = () => {
    this.setState({
      title: ''
    })
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Deck Title</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            placeholder={this.state.placeholder}
            />
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity 
            disabled={this.state.title === ''}
            onPress={this.submit} 
            style={styles.button}>
            <FontAwesome name='plus-square' style={styles.buttonIcon} />
            <Text>CREATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    alignItems: 'center',
    paddingTop: 20
  },
  buttonIcon: {
    fontSize: 40,
    color: 'slategray'
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
  inputView: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    width: '80%'
  }
});

const mapDispatchToProps = (dispatch) => ({
  addDeckSuccess: (deck) => dispatch(addDeckSuccess(deck)),
  addDeckError: (deck) => dispatch(addDeckError(deck))
})

export default connect(null, mapDispatchToProps)(NewDeck);