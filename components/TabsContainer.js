import { createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import Deck from './Deck';
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
  }
});

const TabNavigator = createMaterialTopTabNavigator({
  Decks: DeckStack,
  About: About
}, {
  navigationOptions: {
    headerStyle: {
      marginTop: Constants.statusBarHeight
    }
  }
});

export default createAppContainer(TabNavigator);