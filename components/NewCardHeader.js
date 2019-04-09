import React, { PureComponent } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class NewCardHeader extends PureComponent {
  render() {
    return (
      <TouchableOpacity 
        onPress={() => this.props.navigation.navigate(
          'NewCard', 
          { deckKey: this.props.deckKey }
        )}>
        <View style={styles.newCardView}>
          <MaterialCommunityIcons name='library-plus' color='white' style={styles.textInfo} />
          <Text style={styles.cardSubtitle}>New card!</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  newCardView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInfo: {
    marginRight: 20,
    fontSize: 30,
  },
  cardSubtitle: {
    marginRight: 20,
    color: 'white'
  },
});

export default NewCardHeader;