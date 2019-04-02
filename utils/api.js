import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from './constants';

export const fetchDecksResults = async() => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (decks !== null) {
      console.log(decks);
      return JSON.parse(decks);
    } 
  } catch(error) {
    console.log("ERROR: ", error);  
  }
}

export const createDeck = async({ key, deck }) => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }));
} 

export const clearDecks = async() => {
  try {
    console.log("Wiping Data");
    await AsyncStorage.clear();
  } catch(error) {
    console.log("ERROR: ", error);  
  }
}

export function deleteDeck(key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
}

export const addCardToDeck = async(deck, card) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((decks) => {
      const data = JSON.parse(decks);
      data[deck.title].cards = [...data[deck.title].cards, card];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
}
