import React from "react";

export const Form = ({
  newC,
  allEpisodes,
  handleChange,
  handleSubmit,
  handleEpisodes,
}) => {
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>*Nombre del personaje: </label>
          <input
            type="text"
            name="name"//* Permite escribir en el input
            value={newC.name}
            placeholder="Ej: fuck"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>*Estados, </label>
          <span>ej: Alive - Dead - unknown </span>
          <input
            type="text"
            name="status"//* Permite escribir en el input
            value={newC.status}
            placeholder="Ej: Alive"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>*Episodios: </label>
          <select
            //! Este atributo junto con la linea 40 de New.jsx Resetea el select
            value={newC.episodes}
            onChange={(e) => handleEpisodes(e)}
          >
            <option>Elige los episodios</option>
            {allEpisodes}
          </select>
          <div>
            {
              newC.episodes.map(el => {
                return (
                  <div>
                    <p>{el}</p>
                  </div>
                );
              })
            }
          </div>
        </div>
        <button>Crear personaje</button>
      </form>
    </div>
  );
};
