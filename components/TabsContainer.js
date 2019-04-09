import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import Deck from './Deck';
import DeckInfo from './DeckInfo';
import Card from './Card';
import NewCard from './NewCard';
import Score from './Score';

const DeckStack = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null,
    }
  },
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions: {
      headerForceInset: {top: 'never'},
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerForceInset: {top: 'never'},
    }
  },
  Card: {
    screen: Card,
    navigationOptions: {
      title: 'Card',
      headerForceInset: {top: 'never'},
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'New Card',
      headerForceInset: {top: 'never'},
    }
  },
  Score: {
    screen: Score,
    navigationOptions: {
      title: 'Score',
      headerForceInset: {top: 'never'}
    }
  }
},
{
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'dodgerblue',
    }
  }
}
);

DeckStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    swipeEnabled: false,
  };
};

const TabNavigator = createMaterialTopTabNavigator({
  Decks: DeckStack,
  NewDeck: NewDeck,
});

export default createAppContainer(TabNavigator);