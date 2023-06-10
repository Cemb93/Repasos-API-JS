import { ActionTypes, BackEnd } from "./action-types";

const PORT = "http://localhost:3001";

export const getCharacters = (page, order, filter) => {
  return async (dispatch) => {
    const url = `${PORT}${BackEnd}?page=${page}&order=${order}&filter=${filter}`;
    try {
      const res = await fetch(url);
      const { results } = await res.json();

      dispatch({
        type: ActionTypes.getCharacters,
        payload: results,
      })
    } catch (error) {
      console.log("Error en getCharacters por:", error);
    }
  }
}