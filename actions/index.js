import * as types from '../types/deckTypes';
import * as apiService from '../utils/api';
import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from '../utils/constants';

export const fetchDecks = () => {
  return async dispatch => {
    dispatch(fetchDecksBegin());
    try {
      const response = await apiService.fetchDecksResults();
      dispatch(fetchDecksSuccess(response));
      return response;
    }
    catch (error) {
      return dispatch(fetchDecksError(error));
    }
  }
}

export const fetchDecksBegin = () => {
  return {
    type: types.FETCH_DECKS_BEGIN
  }
}

export const fetchDecksSuccess = (decks) => {
  return {
    type: types.FETCH_DECKS_SUCCESS,
    decks
  }
}

export const fetchDecksError = (error) => {
  return {
    type: types.FETCH_DECKS_ERROR,
    error
  }
}

export const addDeck = (deck) => {
  return async dispatch => {
    dispatch(addDeckBegin(deck));
    try{
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck.key]: deck.deck
      })).then(
        dispatch(addDeckSuccess(deck))
      );
    } catch (error) {
      dispatch(addDeckError(error));
    }
  }
}

export const addDeckBegin = (deck) => {
  return {
    type: types.ADD_DECK_BEGIN,
    deck
  }
}

export const addDeckSuccess = (deck) => {
  return {
    type: types.ADD_DECK_SUCCESS,
    deck
  }
}

export const addDeckError = (error) => {
  return {
    type: types.ADD_DECK_ERROR,
    error
  }
}

export const clearDecks = () => {
  return async dispatch => {
    dispatch(clearDecksBegin());
    try {
      await apiService.clearDecks();
      dispatch(clearDecksSuccess());
      return {};
    }
    catch (error) {
      return dispatch(clearDecksError(error));
    }
  }
}

export const clearDecksBegin = () => {
  return {
    type: types.CLEAR_DECKS_BEGIN,
  }
}

export const clearDecksSuccess = () => {
  return {
    type: types.CLEAR_DECKS_SUCCESS,
  }
}

export const clearDecksError = (error) => {
  return {
    type: types.CLEAR_DECKS_ERROR,
    error
  }
}

export const deleteDeck = (deckKey) => {
  return async dispatch => {
    dispatch(deleteDeckBegin());
    try {
      await apiService.deleteDeck(deckKey);
      dispatch(deleteDeckSuccess(deckKey));
    }
    catch (error) {
      return dispatch(deleteDeckError(error));
    }
  }
}

export const deleteDeckBegin = (deckKey) => {
  return {
    type: types.DELETE_DECK_BEGIN,
    key: deckKey
  }
}

export const deleteDeckSuccess = (deckKey) => {
  return {
    type: types.DELETE_DECK_SUCCESS,
    key: deckKey
  }
}

export const deleteDeckError = (error) => {
  return {
    type: types.DELETE_DECK_ERROR,
    error
  }
}

export const addCardToDeckSuccess = (deck, card) => {
  return {
    type: types.ADD_CARD_SUCCESS,
    deck,
    card
  }
}

export const addCardToDeckError = (deck, card) => {
  return {
    type: types.ADD_CARD_ERROR,
    error
  }
}

export const setUserGuess = (deck, card, answer) => {

}

export const setUserGuessBegin = () => {
  return {
    type: types.SET_USER_GUESS_BEGIN,
    deck,
    card
  }
}

export const setUserGuessSuccess = (deck, card, userGuess) => {
  return {
    type: types.SET_USER_GUESS_SUCCESS,
    deck,
    card,
    userGuess
  }
}

export const setUserGuessError = (deck, card) => {
  return {
    type: types.ADD_CARD_ERROR,
    error
  }
}