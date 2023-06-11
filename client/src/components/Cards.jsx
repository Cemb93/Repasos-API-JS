import React from 'react'
import { Link } from 'react-router-dom';
import s from "../styles/Cards.module.css";

export const Cards = ({ id, name, status, image, episodes }) => {
  return (
    <div className={s.cards} >
      <p>Nombre: {name}</p>
      <Link to={`/characters/${id}`} >
        <img src={image} alt="img not found" />
      </Link>
      <p>Estado: {status}</p>
      <p>Episodios:
        {
          episodes.length > 0 ? (
            episodes.map(el => {
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
