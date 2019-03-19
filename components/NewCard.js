import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'Title',
      answer: 'yes'
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Question</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
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
        <TouchableOpacity  style={styles.button}>
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

export default NewCard;