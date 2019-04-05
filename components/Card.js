import React, { Component } from 'react';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { setUserAnswer } from '../utils/api';
import { setUserGuessSuccess, setUserGuessError } from '../actions/index';

class Card extends Component {

  state = {
    cardBGColor: '#ebeef0',
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });
    this.fronInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  componentDidMount() {
    let { answer, userGuess } = this.props.item;
    this.setState({
      answer, userGuess
    });
  }

  _checkIfAnswerIsCorrect = (answer) => {
    const _correct = this.props.item.answer.toLowerCase() === answer.toLowerCase();
    this.setState({
      userGuess: answer
    });

    setUserAnswer(this.props.deck, this.props.item, answer)
      .then(this.props.setUserGuessSuccess(this.props.deck, this.props.item, answer))
      .catch(error => this.props.setUserGuessError(error));
    
    this.props.swipeTo();
  }

  _flipCard = () => {
    if (this.value >= 90){
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        {rotateY: this.fronInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        {rotateY: this.backInterpolate}
      ]
    }
    
    return (
      <View style={[styles.container, styles.box]}>

        <Animated.View style={[
          styles.flipCard, 
          frontAnimatedStyle, 
          styles.box, 
          {backgroundColor: this.state.cardBGColor},
          {opacity: this.frontOpacity}]}>
          <View style={styles.box}>
            <Text style={styles.questionText}>{this.props.item.question}</Text>
          </View>
          <View style={[styles.box, styles.answerBox]}>
            <TouchableOpacity 
              style={[styles.btn, {flex: 1}]} 
              onPress={() => this._flipCard()}>
              <MaterialIcons style={styles.answerText} name='flip' />
              <Text style={styles.revealText}>Reveal Answer</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.box, styles.answerBox]}>
            <TouchableOpacity 
              style={[styles.btn, {flex: 1}]} 
              onPress={() => this._checkIfAnswerIsCorrect('yes')}>
              <FontAwesome 
                style={styles.answerText} 
                name='check-circle' 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.btn, {flex: 1}]} 
              onPress={() => this._checkIfAnswerIsCorrect('no')}>
              <FontAwesome 
                style={styles.answerText} 
                name='times-circle' 
              />
            </TouchableOpacity>
          </View>
          {this.state.userGuess
            &&
            <View style={styles.box}>
              <Text>Current Answer: {this.state.userGuess.toUpperCase()}</Text>
            </View>
          }
        </Animated.View>

        <Animated.View style={[
          styles.flipCard, 
          styles.flipCardBack, 
          backAnimatedStyle, 
          styles.box, 
          {backgroundColor: this.state.cardBGColor},
          {opacity: this.backOpacity}]}>
          <View style={[styles.box]}>
            <Text style={styles.questionText}>{this.props.item.answer}</Text>
          </View>
          <View style={[styles.box, styles.answerBox]}>
            <TouchableOpacity  
              style={[styles.btn, {flex: 1}]} 
              onPress={() => this._flipCard()}>
              <MaterialIcons style={styles.answerText} name='flip' />
              <Text style={styles.revealText}>Back to Question</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
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
  revealText: {
    fontSize: 20,
    textAlign: 'center'
  },
  answerText: {
    fontSize: 55,
    justifyContent: 'center',
    textAlign: 'center'
  },
  flipCard: {
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    width: '100%'
  }
});

const mapDispatchToProps = (dispatch) => ({
  setUserGuessSuccess: (deck, card, userGuess) => dispatch(setUserGuessSuccess(deck, card, userGuess)),
  setUserGuessError: (error) => dispatch(setUserGuessError(error))
})

export default connect(null, mapDispatchToProps)(Card);