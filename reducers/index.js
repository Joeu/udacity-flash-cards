import * as types from '../types/deckTypes';

const decksReducer = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_DECKS_BEGIN:
      return {
        ...state
      }
    case types.FETCH_DECKS_SUCCESS:
      return {
        ...state,
        decks: action.decks
      }
    case types.FETCH_DECKS_ERROR:
      return{
        ...state,
      }
    // case types.ADD_DECK_BEGIN:
    //   return {
    //     ...state
    //   }
    case types.ADD_DECK_SUCCESS:
      return {
        ...state,
        decks: {...state.decks, ...action.deck}
      }
    // case types.ADD_DECK_ERROR:
    //   return{
    //     ...state,
    //   }

    case types.CLEAR_DECKS_BEGIN:
      return {
        ...state
      }
    case types.CLEAR_DECKS_SUCCESS:
      return {
        ...state,
        decks: {}
      }
    case types.CLEAR_DECKS_ERROR:
      return{
        ...state,
      }

    case types.DELETE_DECK_BEGIN:
      return {
        ...state
      }
    case types.DELETE_DECK_SUCCESS:
      let _remainingDecks = Object.values(state.decks).filter(deck => deck.title !== action.key);
      return {
        ...state,
        decks: _remainingDecks
      }
    case types.DELETE_DECK_ERROR:
      return{
        ...state,
      }
    default:
      return state
  }
}

export default decksReducer;