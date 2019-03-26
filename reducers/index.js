import * as types from '../types/deckTypes';

const cardsReducer = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_DECKS_BEGIN:
      return {
        ...state
      }
    case types.FETCH_DECKS_SUCCESS:
      const { decks } = action;
      return {
        ...state,
        ...action.decks
      }
    case types.FETCH_DECKS_ERROR:
      return{
        ...state,
      }
  }
}

export default cardsReducer;