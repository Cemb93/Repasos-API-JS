import { ActionTypes } from "./action-types"

const initialState = {
  allCharacters: [],
  copyCharacters:[],
  detail: {},
  episode: [],
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.getCharacters:
      return {
        ...state,
        allCharacters: action.payload,
        // copyCharacters: action.payload,
      }
    case ActionTypes.getName:
      return {
        ...state,
        allCharacters: action.payload,
      }
    case ActionTypes.getDetail:
      return {
        ...state,
        detail: action.payload
      }
    case ActionTypes.getEpisodes:
      return {
        ...state,
        episode: action.payload,
      }
    default: return state;
  }
}