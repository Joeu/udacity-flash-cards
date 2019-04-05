import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { addCardToDeck } from '../utils/api';
import { addCardToDeckSuccess, addCardToDeckError } from '../actions/index';

class Score extends Component {
  
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text style={styles.text}>Score</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('DeckList')}>
          <Text>GO HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>RESET</Text>
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

const mapStateToProps = (state) => ({
  decks: state.decks
})

export default connect(mapStateToProps)(Score);