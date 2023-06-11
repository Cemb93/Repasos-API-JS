import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Cards } from './Cards';

export default function Characters() {
  const dispatch = useDispatch();

  const [page, setPages] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getCharacters(page, order, filter));
  }, [dispatch, page, order, filter]);

  const { allCharacters } = useSelector(state => state);
  // console.log("Characters:", allCharacters)

  const handleClick = e => {
    e.preventDefault();
    dispatch(getCharacters(page, order, filter));
  }
  
  const prev = e => {
    e.preventDefault();
    page < 1 ? setPages(0) : setPages(page - 6);
  }
  
  const next = e => {
    e.preventDefault();
    allCharacters.length < 6 ? setPages(page) : setPages(page + 6);
  }
  
  const changeOrder = e => {
    e.preventDefault();
    setOrder(e.target.valuer);
  }
  
  const changeFilter = e => {
    e.preventDefault();
    setFilter(e.target.value);
  }
  return (
    <div>
      <Link to={"/create"} >Crear Personaje</Link>
      <button onClick={(e) => handleClick(e)} >
        Cargar todos los personajes
      </button>
      <div>
        <h4>Filter by status</h4>
        <select onChange={(e) => changeOrder(e)} >
          <option value="">Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
      <div>
        <h4>Order by name</h4>
        <select onChange={(e) => changeFilter(e)} >
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
      </div>
      <button onClick={(e) => prev(e)} disabled={page < 1} >
        {"<-- PREV"}
      </button>
      <button onClick={(e) => next(e)} disabled={allCharacters.length < 6} >
        {"<-- NEXT"}
      </button>
      {
        allCharacters?.map(el => {
          return (
            <div key={el.id} >
              <Cards 
                key={el.id}
                id={el.id}
                name={el.name}
                image={el.image}
                status={el.status}
                episodes={el.episodes}
              />
            </div>
          );
        })
      }
    </div>
  );
}
