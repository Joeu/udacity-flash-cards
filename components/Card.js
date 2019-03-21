import React, { Component } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

class Card extends Component {

  state = {
    cardBGColor: '#ebeef0'
  }

  _checkIfAnswerIsCorrect = (answer) => {
    const _correct = this.props.item.answer.toLowerCase() === answer.toLowerCase()
      ? '#3CB371'
      : '#D2691E';
    this.setState({cardBGColor: _correct});
  }

  render() {
    return (
      <View style={[styles.container, styles.box, {backgroundColor: this.state.cardBGColor}]}>
        <View style={styles.box}>
          <Text style={styles.questionText}>{this.props.item.question}</Text>
        </View>
        <View style={[styles.box, styles.answerBox]}>
          <TouchableOpacity 
            style={[styles.btn, {flex: 1}]} 
            onPress={() => this._checkIfAnswerIsCorrect('yes')}>
            <FontAwesome style={styles.answerText} name='check-circle' />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.btn, {flex: 1}]} 
            onPress={() => this._checkIfAnswerIsCorrect('no')}>
            <FontAwesome style={styles.answerText} name='times-circle' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 80,
    marginBottom: 80
  },
  answerBox: {
    flexDirection: 'row'
  },
  btn: {
    height: 50,
    margin: 10,
  },
  questionText: {
    fontSize: 30,
    textAlign: 'center'
  },
  answerText: {
    fontSize: 55,
    justifyContent: 'center',
    textAlign: 'center'
  }
});

export default Card;