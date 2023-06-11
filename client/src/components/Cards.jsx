import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom';

export const Cards = ({ id, name, status, image, episodes }) => {
  return (
    <div>
      <p>Nombre: {name}</p>
      <Link to={`/characters${id}`} >
        <img src={image} alt="img not found" />
      </Link>
      <p>Estado: {status}</p>
      <p>Episodios:
        {
          Array.isArray(episodes) ? (
            episodes?.map(el => {
              return (
                <ul>
                  <li>{el.name}</li>
                </ul>
              );
            }) 
          ): (
            <p>No tiene episodios disponibles</p>
          )
        }
      </p>
    </div>
  );
}
