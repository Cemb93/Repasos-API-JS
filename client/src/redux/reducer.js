import { ActionTypes } from "./action-types"

const initialState = {
  allCharacters: [],
  copyCharacters:[],
  detail: {},
  episodes: [],
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.getCharacters:
      return {
        ...state,
        allCharacters: action.payload,
        copyCharacters: action.payload,
      }
    default: return state;
  }
}