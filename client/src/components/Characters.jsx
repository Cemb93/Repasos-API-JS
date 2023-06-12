import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Cards } from './Cards';
import s from "../styles/Characters.module.css";
import { SearchBar } from './SearchBar';

export default function Characters() {
  const dispatch = useDispatch();

  const [page, setPages] = useState(0);
  const [order, setOrder] = useState("ASC");
  // const [order, setOrder] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getCharacters(page, order, filter));
  }, [dispatch, page, order, filter]);//* Array de Dependencias

  const { allCharacters } = useSelector(state => state);

  const handleClick = e => {
    e.preventDefault();
    dispatch(getCharacters(page, order, filter));
  }
  
  //* Paginado
  const prev = e => {
    e.preventDefault();
    page < 1 ? setPages(0) : setPages(page - 6);
  }
  
  const next = e => {
    e.preventDefault();
    allCharacters.length < 6 ? setPages(page) : setPages(page + 6);
  }
  
  //* Ordenamiento
  const changeOrder = e => {
    e.preventDefault();
    setOrder(e.target.value);//* ASC || DESC
  }
  
  //* Filtrado
  const changeFilter = e => {
    e.preventDefault();
    setFilter(e.target.value);//* Alive - Dead - unknown
  }
  return (
    <div>
      <Link to={"/character/create"} >Crear Personaje</Link>
      <br />
      <button onClick={(e) => handleClick(e)} >
        Cargar todos los personajes
      </button>
      <SearchBar/>
      <div>
        <h4>Filter by status</h4>
        <select onChange={(e) => changeFilter(e)} >
          <option value="">Todos</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
      <div>
        <h4>Order by name</h4>
        <select onChange={(e) => changeOrder(e)} >
          {/* <option value="">Todos</option> */}
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
      </div>
      <button onClick={(e) => prev(e)} disabled={page < 1} >
        {"<-- PREV"}
      </button>
      <button onClick={(e) => next(e)} disabled={allCharacters.length < 6} >
        {"NEXT -->"}
      </button>
      <div className={s.cards} >
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
    </div>
  );
}
