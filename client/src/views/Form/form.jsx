import image from '../../assent/ash-pokemon.png'
import React, { useState } from 'react';
import { createPokemon, getAllPokemon, resetPokemons } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function validate(pokemonData) {
  let errores = {};

  if (!pokemonData.Nombre) {
    errores.Nombre = "Ingrese nombre de pokemon";
  }
  
  if (pokemonData.Nombre.length >= 20) {
    errores.Nombre = "Maximo 20 caracteres";
  }

  if (pokemonData.Vida < 10 || pokemonData.Vida > 200) {
    errores.Vida = "Debe ser mayor a 10 y menor de 200";
  }
  if (!pokemonData.Vida) {
    errores.Vida = "Ingrese Vida";
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
    const [showError, setShowError] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [namePokemonExists, setNamePokemonExists] = useState(false);
  const [errores, setErrores] = useState({
    Nombre: '',
    Vida: '',
  });
  useEffect(() => {
    const checkNameExists = () => {
      const nombreExists = allPokemons.some(pokemon => pokemon.Nombre === pokemonData.Nombre.toUpperCase());
      setNamePokemonExists(nombreExists);
    };

    // Verificar si el nombre ya existe al cambiar el valor del nombre del Pokemon
    checkNameExists();
  }, [pokemonData.Nombre, allPokemons]);

  useEffect(() => {
    if (errors === 'No se pudo crear al pokemon') {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        dispatch(resetPokemons())
      }, 2000); // Mostrar el mensaje de error durante 3 segundos

      return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
    }
  }, [errors]);

  useEffect(() => {
    if (check) {
      setShowCheck(true);
      const timer = setTimeout(() => {
        setShowCheck(false);
      }, 2000); // Mostrar el mensaje de éxito durante 3 segundos

      return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
    }
  }, [check]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setPokemonData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    setErrores(
      validate({
        ...pokemonData,
        [name]: value,
      })
    );
  };
  const handleTypeSelection = (event) => {
    const { value } = event.target;

    if (pokemonData.Tipos.length >= 3 || pokemonData.Tipos.includes(value)) {
        return alert('Error')// No agregar más tipos o evitar repeticiones
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

    // Realizar validaciones de los campos ingresados
    if (!pokemonData.Nombre) {
      // Mostrar mensajes de error o realizar alguna acción cuando los campos no sean válidos
      return alert('error. faltan datos');
    }
    
    const altura = pokemonData.Altura ? pokemonData.Altura * 10 : '';
    const peso = pokemonData.Peso ? pokemonData.Peso * 10 : '';

    // Aquí puedes hacer algo con los datos ingresados, como enviarlos a un servidor o procesarlos de alguna manera

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
    <div>
        <h1>CREAR POKEMON</h1>
        <img src={image} width='200em' alt="" />
      <div>
        <label>Nombre:</label>
        <input type="text" id="Nombre" name="Nombre" value={pokemonData.Nombre} onChange={handleInputChange} />
        {errores.Nombre ? <p>{errores.Nombre}</p> : null}
        {namePokemonExists && <p>Ya existe el nombre del pokemon</p>}
      </div>
      <div>
        <label>Vida:</label>
        <input type="number" id="Vida" name="Vida" value={pokemonData.Vida} onChange={handleInputChange} />
        {errores.Vida ? <p>{errores.Vida}</p>: null}     
      </div>
      <div>
        <label>Ataque:</label>
        <input type="number" id="Ataque" name="Ataque" value={pokemonData.Ataque} onChange={handleInputChange} />
      </div>
      <div>
        <label>Defensa:</label>
        <input type="number" id="Defensa" name="Defensa" value={pokemonData.Defensa} onChange={handleInputChange} />
      </div>
      <div>
        <label>Velocidad:</label>
        <input type="number" id="Velocidad" name="Velocidad" value={pokemonData.Velocidad} onChange={handleInputChange} />
      </div>
      <div>
        <label>Altura(metros):</label>
        <input type="number" id="Altura" name="Altura" value={pokemonData.Altura} onChange={handleInputChange} />
      </div>
      <div>
        <label>Peso(kg):</label>
        <input type="number" id="Peso" name="Peso" value={pokemonData.Peso} onChange={handleInputChange} />
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
        <ul>
          {pokemonData.Tipos.map((type, index) => (
            <li key={index}>
              {type}
              <button onClick={() => removeType(type)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit}>CREAR</button>
      {showError && <p>{errors} </p>}
      {showCheck && <p>{check}</p>}
    </div>
  );
}

export default Form;
