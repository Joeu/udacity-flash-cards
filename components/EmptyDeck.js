import React, { PureComponent } from 'react';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

class EmptyDeck extends PureComponent {
  render() {
    return (
      <View showsButtons={true}>
        <Text>You can create a new Card question in the </Text>
          <FontAwesome name='comment' style={styles.newCardButton} /> 
        <Text>above!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newCardButton: {
    marginRight: 20,
    fontSize: 30
  }
});


export default EmptyDeck;