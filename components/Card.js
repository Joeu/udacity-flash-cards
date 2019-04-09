import React, { Component } from 'react';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { setUserAnswer } from '../utils/api';
import { setUserGuessSuccess, setUserGuessError } from '../actions/index';

class Card extends Component {

  state = {
    cardBGColor: 'transparent',
    flipText: 'Flip to reveal answer'
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
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
    this.setState({
      userGuess: answer,
    });

    setUserAnswer(this.props.deck, this.props.item, answer)
      .then(this.props.setUserGuessSuccess(this.props.deck, this.props.item, answer))
      .catch(error => this.props.setUserGuessError(error));

    this.props.swipeToNext();
  }

  _flipCard = () => {
    if (this.value >= 90) {
      this.setState({
        flipText: 'Flip to reveal answer'
      });
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      this.setState({
        flipText: 'Back to Question'
      });
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
        { rotateY: this.fronInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.box}>

        <View style={[styles.cardLayout, styles.box]}>
          <Animated.View style={[
            styles.flipCard,
            frontAnimatedStyle,
            styles.box,
            { backgroundColor: this.state.cardBGColor },
            { opacity: this.frontOpacity }]}>
            <View style={styles.box}>
              <Text style={styles.questionText}>{this.props.item.question}</Text>
            </View>

            <View style={[styles.box, styles.answerBox]}>
              <TouchableOpacity
                style={[styles.btn, { flex: 1 }]}
                onPress={() => this._checkIfAnswerIsCorrect('yes')}>
                <MaterialCommunityIcons
                  style={styles.btnIcon}
                  name='thumb-up-outline'
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { flex: 1 }]}
                onPress={() => this._checkIfAnswerIsCorrect('no')}>
                <MaterialCommunityIcons
                  style={styles.btnIcon}
                  name='thumb-down-outline'
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
            styles.backCard,
            { backgroundColor: this.state.cardBGColor },
            { opacity: this.backOpacity }]}>
            <View>
              <Text style={styles.questionText}>{this.props.item.answer.toUpperCase()}</Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.box}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this._flipCard()}>
            <MaterialIcons style={styles.btnIcon} name='flip' />
            <Text style={styles.revealText}>{this.state.flipText}</Text>
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
  cardLayout: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 30,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5
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
  btnIcon: {
    fontSize: 55,
    justifyContent: 'center',
    textAlign: 'center',
    color: 'slategray'
  },
  backCard: {
    marginTop: 40
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