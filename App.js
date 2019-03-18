import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import TabsContainer from './components/TabsContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>

        <TabsContainer />
        <View style={{ flex: 1 }}>
          <Text>BLAAAA</Text>
        </View>

      </View>
    );
  }
}
