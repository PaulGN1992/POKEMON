import image from '../../assent/ash-pokemon.png'
import React, { useState } from 'react';
import { createPokemon, getAllPokemon, resetPokemons } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import style from '../Form/form.module.css'

function validate(pokemonData) {
  let errores = {};

  if (!pokemonData.Nombre) {
    errores.Nombre = "Ingrese nombre de pokemon";
  } else if (!/^[A-Za-z\s]+$/.test(pokemonData.Nombre)) {
    errores.Nombre = "Solo se permiten letras";
  }
  
  if (pokemonData.Nombre.length >= 20) {
    errores.Nombre = "Maximo 20 caracteres";
  } 

  if (pokemonData.Vida < 10 || pokemonData.Vida > 201) {
    errores.Vida = "Debe ser mayor a 10 y menor de 200";
  }
  if (!pokemonData.Vida) {
    errores.Vida = "Ingrese Vida";
  }
  
  if (pokemonData.Ataque < 10 || pokemonData.Ataque > 201) {
    errores.Ataque = "Debe ser mayor a 10 y menor de 200";
  }
  if (!pokemonData.Ataque) {
    errores.Ataque = "Ingrese Ataque";
  }

  if (pokemonData.Defensa < 10 || pokemonData.Defensa > 201) {
    errores.Defensa = "Debe ser mayor a 10 y menor de 200";
  }
  if (!pokemonData.Defensa) {
    errores.Defensa = "Ingrese Defensa";
  }

  if (pokemonData.Velocidad < 10 || pokemonData.Velocidad > 201) {
    errores.Velocidad = "Debe ser mayor a 10 y menor de 200";
  }
  if (!pokemonData.Velocidad) {
    errores.Velocidad = "Ingrese Velocidad";
  }

  if (pokemonData.Altura < 0.1 || pokemonData.Altura > 15) {
    errores.Altura = "Debe ser mayor 0.1m y menor a 15 metros";
  }
  if (!pokemonData.Altura) {
    errores.Altura = "Ingrese Altura";
  }

  if (pokemonData.Altura < 0.1 || pokemonData.Altura > 15) {
    errores.Altura = "Debe ser mayor 0.1m y menor a 15 metros";
  }
  if (!pokemonData.Altura) {
    errores.Altura = "Ingrese Altura";
  }

  if (pokemonData.Peso > 500) {
    errores.Peso = "Debe menor a 500 kg";
  }
  if (!pokemonData.Peso) {
    errores.Peso = "Ingrese Peso";
  }

  return errores;
}

function Form() {
    const dispatch = useDispatch()
    const errors = useSelector(state=> state.error)
    const check = useSelector(state=> state.check)
    const allPokemons = useSelector(state=>state.copyPokemons)
    const typesPokemon = useSelector(state => state.types);
    const [pokemonData, setPokemonData] = useState({
    Nombre: '',
    Vida: '',
    Ataque: '',
    Defensa: '',
    Velocidad: '',
    Altura: '',
    Peso: '',
    Tipos: []
    });
    const [state, setState] = useState({
      showError: false,
      showCheck: false,
      namePokemonExists: false,
      errores: {},
    });
    

  useEffect(() => {
    const checkNameExists = () => {
    const nombreExists = allPokemons.some(
      (pokemon) => pokemon.Nombre === pokemonData.Nombre.toUpperCase()
    );
      setState((prevState) => ({
        ...prevState,
        namePokemonExists: nombreExists,
      }));
    };

  checkNameExists();
  }, [pokemonData.Nombre, allPokemons]);

  useEffect(() => {
    if (errors === 'No se pudo crear al pokemon') {
      setState((prevState) => ({
        ...prevState,
        showError: true,
      }));
  
      const timer = setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          showError: false,
        }));
        dispatch(resetPokemons());
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    if (check) {
      setState((prevState) => ({
        ...prevState,
        showCheck: true,
      }));

      const timer = setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          showCheck: false,
        }));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [check]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setPokemonData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    setState((prevState) => ({
      ...prevState,
      errores: validate({
        ...pokemonData,
        [name]: value,
      }),
    }));
  };

  const handleTypeSelection = (event) => {
    const { value } = event.target;

    if (pokemonData.Tipos.length >= 3) {
        setState((prevData)=>({
          ...prevData,
          errores: {
            Tipos: "Maximo 3 tipos "
          }
        }))
      } else if (pokemonData.Tipos.includes(value)) {
        setState((prevData)=>({
          ...prevData,
          errores: {
            Tipos: "Ya existe ese tipo"
          }
        })) 
      }
    setPokemonData((prevData) => ({
      ...prevData,
      Tipos: [...prevData.Tipos, value]
    }));
  };

  const removeType = (type) => {
    setPokemonData((prevData) => ({
      ...prevData,
      Tipos: prevData.Tipos.filter((t) => t !== type)
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const altura = pokemonData.Altura ? pokemonData.Altura * 10 : '';
    const peso = pokemonData.Peso ? pokemonData.Peso * 10 : '';

    dispatch(createPokemon({
      Nombre: pokemonData.Nombre.toUpperCase(),
      Vida: pokemonData.Vida,
      Ataque: pokemonData.Ataque,
      Defensa: pokemonData.Defensa,
      Velocidad: pokemonData.Velocidad,
      Altura: altura,
      Peso: peso,
      Tipos: pokemonData.Tipos,
    }))
    dispatch(getAllPokemon())

    setPokemonData({
      Nombre: '',
      Vida: '',
      Ataque: '',
      Defensa: '',
      Velocidad: '',
      Altura: '',
      Peso: '',
      Tipos: [],
    });
      
  };
 
  return (
    <div className={style.form}>
        <h1>CREAR POKEMON</h1>
        <img src={image} width='200em' alt="" />
      <div>
        <label>Nombre:</label>
        <input type="text" id="Nombre" name="Nombre" value={pokemonData.Nombre} onChange={handleInputChange} />
        {state.errores.Nombre && <p>{state.errores.Nombre}</p>}
        {state.namePokemonExists && <p>Ya existe el nombre del pokemon</p>}
      </div>
      <div>
        <label>Vida:</label>
        <input type="number" id="Vida" name="Vida" value={pokemonData.Vida} onChange={handleInputChange} />
        {state.errores.Vida && <p>{state.errores.Vida}</p>}   
      </div>
      <div>
        <label>Ataque:</label>
        <input type="number" id="Ataque" name="Ataque" value={pokemonData.Ataque} onChange={handleInputChange} />
        {state.errores.Ataque && <p>{state.errores.Ataque}</p>}
      </div>
      <div>
        <label>Defensa:</label>
        <input type="number" id="Defensa" name="Defensa" value={pokemonData.Defensa} onChange={handleInputChange} />
        {state.errores.Defensa && <p>{state.errores.Defensa}</p>}
      </div>
      <div>
        <label>Velocidad:</label>
        <input type="number" id="Velocidad" name="Velocidad" value={pokemonData.Velocidad} onChange={handleInputChange} />
        {state.errores.Velocidad && <p>{state.errores.Velocidad}</p>}
      </div>
      <div>
        <label>Altura(metros):</label>
        <input type="number" id="Altura" name="Altura" value={pokemonData.Altura} onChange={handleInputChange} />
        {state.errores.Altura && <p>{state.errores.Altura}</p>}
      </div>
      <div>
        <label>Peso(kg):</label>
        <input type="number" id="Peso" name="Peso" value={pokemonData.Peso} onChange={handleInputChange} />
        {state.errores.Peso && <p>{state.errores.Peso}</p>}
      </div>
      <div>
        <span>
          Tipos:{' '}
          <select
            name="Tipos"
            value={''}
            onChange={handleTypeSelection}
          >
            <option value="">Seleccionar tipo</option>
            {typesPokemon.map((type) => (
              <option key={type.ID} value={type.Nombre}>
                {type.Nombre}
              </option>
            ))}
          </select>
        </span>
        {state.errores.Tipos && <p>{state.errores.Tipos}</p>}
        <ul>
          {pokemonData.Tipos.map((type, index) => (
            <li key={index}>
              {type}
              <button onClick={() => removeType(type)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      {Object.keys(state.errores).length === 0 && (<button onClick={handleSubmit}>CREAR</button>)}
      {state.showError && <p>{errors} </p>}
      {state.showCheck && <p>{check}</p>}
    </div>
  );
}

export default Form;
