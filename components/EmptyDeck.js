import React, { PureComponent } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

class EmptyDeck extends PureComponent {
  render() {
    return (
      <View style={styles.container} showsButtons={true}>
        <Text>You can create a new Card question in the </Text>
        <MaterialCommunityIcons 
          name='library-plus' 
          style={styles.newCardButton} />
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
    fontSize: 30,
    color: 'slategray'
  }
});


export default EmptyDeck;