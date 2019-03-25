import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from './constants';

export const fetchDecksResults = async() => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (decks !== null) {
      return JSON.parse(decks);
    } 
  } catch(error) {
    console.log("ERROR: ", error);  
  }
}

export const createDeck = async({ key, deck }) => {
  try {
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [key]: deck
    }));
  } catch(error) {
    console.log("ERROR: ", error);  
  }
}

export const clearDecks = async() => {
  try {
    console.log("Wiping Data");
    await AsyncStorage.clear();
  } catch(error) {
    console.log("ERROR: ", error);  
  }
}