import * as types from '../types/deckTypes';
import * as apiService from '../utils/api';
import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from '../utils/constants';


export const fetchDecks = () => {
  return dispatch => {
    dispatch(fetchDecksBegin());
    return apiService.fetchDecksResults()
      .then(response => {
        dispatch(fetchDecksSuccess(response));
        return response;
      }).catch(error => 
        dispatch(fetchDecksError(error)
      ));
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
  return dispatch => {
    dispatch(addDeckBegin(deck));
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deck.key]: deck.deck
    }), (error) => {
      if (error) dispatch(addDeckError(error))
      else dispatch(addDeckSuccess(deck));
    });
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
  return dispatch => {
    dispatch(clearDecksBegin());
    return apiService.clearDecks()
      .then(() => {
        dispatch(clearDecksSuccess());
        return {};
      })
      .catch(error => 
        dispatch(clearDecksError(error)
      ));
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
  return dispatch => {
    dispatch(deleteDeckBegin(deckKey));
    return apiService.deleteDeck(deckKey)
      .then(() => {
        dispatch(deleteDeckSuccess(deckKey));
      })
      .catch(error => 
        dispatch(deleteDeckError(error)
      ));
  } 
}

export const deleteDeckBegin = (deckKey) => {
  console.log("DELETING DECK :", deckKey)
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

// export const addCardToDeck = (deckKey, card) => {
//   return dispatch => {
//     dispatch(addCardToDeckBegin());
//     return api
//   }
// }

export const addCardToDeckSuccess = (deck, card) => {
  return {
    type: types.ADD_CARD_SUCCESS,
    deck,
    card
  }
}