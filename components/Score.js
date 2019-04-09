import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setLocalNotification, clearLocalNotification } from '../utils/notificationHandler';

class Score extends Component {
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  render() {
    const { navigation } = this.props;
    const { deck, qtdCorrect, total } = navigation.state.params;
    const _percentage = parseFloat(qtdCorrect / total).toFixed(2) * 100;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          You got {_percentage}%
          {'\n'}
          of aswers correct!!
        </Text>
        <View style={styles.buttonsView}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('DeckList')}>
            <MaterialCommunityIcons style={styles.buttonIcon} name='home' />
            <Text>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate(
              'Deck', 
              { 
                deck: deck
              })}>
            <MaterialCommunityIcons style={styles.buttonIcon} name='restart' />
            <Text>RESTART</Text>
          </TouchableOpacity>
        </View>
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
  buttonIcon: {
    fontSize: 20,
    color: 'slategray'
  },
  buttonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
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