import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import Deck from './Deck';
import Card from './Card';
import About from './About';
import { Constants } from 'expo';

const DeckStack = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null,
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      header: null,
    },
  },
  Card: {
    screen: Card,
    navigationOptions: {
      header: null,
    }
  }
},
{
  initialRouteName: 'DeckList',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}
);

const TabNavigator = createMaterialTopTabNavigator({
  Decks: DeckStack,
  About: About
});

export default createAppContainer(TabNavigator);