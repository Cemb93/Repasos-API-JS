import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createCharacter, getEpisodes } from '../../redux/actions';
import { Form } from './Form';

export const New = () => {
  const initialState = {
    name: "",
    status: "",
    image: "",
    episodes: [],
  }
  const [newC, setNew] = useState(initialState);
  const dispatch = useDispatch();
  // const history = useHistory();
  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);
  const { episode } = useSelector(state => state);
  const allEpisodes = episode.map(ep => {
    return (
      <option key={ep.id} >
        {ep.name}
      </option>
    );
  });
  const handleChange = e => {
    setNew({
      ...newC,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = e => {
    e.preventDefault();
    //* ImgDefault -> https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg
    if (newC.name) {
      dispatch(createCharacter(newC));
      alert(`El personaje ${newC.name.toUpperCase()} ha sido creado`);
      setNew(initialState);
    }
  }
  const handleEpisodes = e => {
    setNew({
      ...newC,
      episodes: newC.episodes.includes(e.target.value)
        ? newC.episodes
        : [...newC.episodes, e.target.value],
    })
  }
  return (
    <Form
      newC={newC}
      allEpisodes={allEpisodes}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleEpisodes={handleEpisodes}
    />
  );
}
