import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions";

export const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(name));
    //! Esta funcion junto con la linea 28 Resetea el input
    setName("");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} >
      <div>
        <input
          type="text"
          //! Este Atributo junto con la linea 13 Resetea el input
          value={name}
          placeholder="Buscar..."
          onChange={(e) => handleInputChange(e)}
        />
        <button>Buscar</button>
      </div>
    </form>
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Buscar..."
    //     onChange={(e) => handleInputChange(e)}
    //   />
    //   <button onClick={(e) => handleClick(e)}>Buscar</button>
    // </div>
  );
};
