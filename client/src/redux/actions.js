import { ActionTypes, BackEnd } from "./action-types";

const PORT = "http://localhost:3001";

export const getCharacters = (page, order, filter) => {
  return async (dispatch) => {
    //! IMPORTANTE, esta ruta tiene que ser la misma del back-end
    const url = `${PORT}${BackEnd.C}?page=${page}&order=${order}&filterStatus=${filter}`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      dispatch({
        type: ActionTypes.getCharacters,
        payload: data,
      });
    } catch (error) {
      console.log("Error en getCharacters por:", error);
    }
  }
}

export const getByName = (name) => {
  return async (dispatch) => {
    const url = `${PORT}${BackEnd.C}?name=${name}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      dispatch({
        type: ActionTypes.getName,
        payload: data,
      });
    } catch (error) {
      console.log("Error en getByName por:", error);
    }
  }
}

export const getById = (id) => {
  return async (dispatch) => {
    const url = `${PORT}${BackEnd.C}/${id}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      dispatch({
        type: ActionTypes.getDetail,
        payload: data,
      })
    } catch (error) {
      console.log("Error en getById por:", error);
    }
  }
}

export const createCharacter = (form) => {
  console.log("form:", form);
  return async (dispatch) => {
    const url = `${PORT}${BackEnd.C}`;
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "application/json"
        }
      });
      // console.log("res create:", res)
    } catch (error) {
      console.log("Error en createCharacter por:", error);
    }
  }
}

export const getEpisodes = () => {
  return async (dispatch) => {
    const url = `${PORT}${BackEnd.E}`;
    try {
      const data = await fetch(url).then(res => {
        return res.json();
      });

      dispatch({
        type: ActionTypes.getEpisodes,
        payload: data,
      })
    } catch (error) {
      
    }
  }
}