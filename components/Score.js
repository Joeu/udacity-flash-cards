import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Score extends Component {
  render() {
    const { navigation } = this.props;
    const { deck, index, total } = navigation.state.params;
    const _percentage = parseFloat(index / total).toFixed(2) * 100;

    return (
      <View>
        <Text style={styles.text}>You achieved {}</Text>
        <Text style={styles.text}>Score: {_percentage} %</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('DeckList')}>
          <Text>GO HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate(
            'Deck', 
            { 
              deck: deck 
            })}>
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

export default connect()(Score);