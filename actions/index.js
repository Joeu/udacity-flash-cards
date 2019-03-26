import * as types from '../types/deckTypes';
import * as apiService from '../utils/api';

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