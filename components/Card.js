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
      <View style={[styles.container, {backgroundColor: this.state.cardBGColor}]}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{this.props.item.question}</Text>
        </View>
        <View style={styles.answerBox}>
          <TouchableOpacity 
            style={[styles.box, {flex: 1}]} 
            onPress={() => this._checkIfAnswerIsCorrect('yes')}>
            <FontAwesome style={styles.answerText} name='check-circle' />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.box, {flex: 1}]} 
            onPress={() => this._checkIfAnswerIsCorrect('no')}>
            <FontAwesome style={styles.answerText} name='times-circle' />
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
    justifyContent: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 80,
    marginBottom: 80
  },
  questionBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
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