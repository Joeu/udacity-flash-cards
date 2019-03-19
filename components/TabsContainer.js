import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import Deck from './Deck';
import Card from './Card';
import NewCard from './NewCard';
import { Constants } from 'expo';

const DeckStack = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null,
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
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'New Card',
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
    swipeEnabled: false
  };
};

const TabNavigator = createMaterialTopTabNavigator({
  Decks: DeckStack,
  NewDeck: NewDeck
});

export default createAppContainer(TabNavigator);