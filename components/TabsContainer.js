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
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'Create new Deck',
      headerForceInset: {top: 'never'}
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Deck',
      headerForceInset: {top: 'never'}
    }
  },
  Card: {
    screen: Card,
    navigationOptions: {
      title: 'Card',
      headerForceInset: {top: 'never'}
    }
  }
});

DeckStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const TabNavigator = createMaterialTopTabNavigator({
  Decks: DeckStack,
  About: About
});

export default createAppContainer(TabNavigator);