import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from '../redux/actions';

export default function Characters() {
  const dispatch = useDispatch();

  const [page, setPages] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getCharacters(page, order, filter));
  }, [dispatch, page, order, filter]);

  const { allCharacters } = useSelector(state => state);

  const handleClick = e => {
    e.preventDefault();
    dispatch(getCharacters(page, order, filter));
  }
  
  const prev = e => {
    e.preventDefault();
    page < 1 ? setPages(0) : setPages(page - 6);
  }
  return (
    <div>Characters</div>
  );
}
