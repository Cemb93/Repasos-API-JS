import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getById } from '../redux/actions';
import { Link } from 'react-router-dom';

export const Detail = (props) => {
  const { id } = props.match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  const { detail } = useSelector(state => state);
  return (
    <div>
      <p>Nombre: {detail.name}</p>
      <img src={detail.image} alt="img not found" />
      <p> Episodios:
        {
          detail.episodes && detail.episodes.length > 0 ? (
            detail.episodes.map(el => {
              return (
                <ul>
                  <li>{el.name}</li>
                </ul>
              );
            })
          ) : (
            <p>No hay episodios disponibles</p>
          )
        }
      </p>
      <br />
      <Link to={"/characters"} >
        <button>Regresar</button>
      </Link>
    </div>
  );
}
