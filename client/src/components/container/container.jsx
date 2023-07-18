import Pokemon from '../pokemon/pokemon';
import style from '../container/container.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getPokemonName, filterTypes, resetPokemons } from '../../redux/actions';

export default function Container (){
  const pokemons = useSelector(state=> state.allPokemons);
  const pokemonsName = useSelector(state=> state.pokemonsName);
  const typesPokemon = useSelector(state => state.types);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const pokemonPerPage = 12;
  const dispatch = useDispatch();
  
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemonsName.length<1? pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon): pokemonsName;
  
  const totalPages = Math.ceil(pokemons.length / pokemonPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const inicioHandle = () => {
    setCurrentPage(1)
  }

  const finHandle = () => {
    setCurrentPage(totalPages)
  }

  const handleTypes = (e) => {
    setSelectedType(e.target.value);
    dispatch(filterTypes(e.target.value))
  }

  const handleReset = () =>{
    dispatch(resetPokemons())
    setCurrentPage(1)
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  const renderButton = ()=> {
    return pokemonsName.length > 0? (
      <button onClick={()=>dispatch(getPokemonName(''))}>Ver todos</button>
  ) : (
    <div>
      <button onClick={inicioHandle} disabled={currentPage === 1}>
          INICIO
      </button>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Anterior
      </button>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Siguiente
      </button>
      <button onClick={finHandle} disabled={currentPage === totalPages}>
          FINAL
      </button>
    </div>
  )
  }
    
  return(
    <div>
      <div className={style.botones}>
        <span onChange={handleTypes}>{`FILTRAR:  `}
          <select>{typesPokemon.map((type)=>(<option key={type.ID} value={type.Nombre}>{type.Nombre}</option>))}</select>
          <button onClick={handleReset}>RESET</button>
        </span>
        {renderButton()}
        <span>ORDENAR: <select><option value="Prueba">Prueba2</option></select></span>
      </div>
      <div className={style.container}>
      {currentPokemon.map((p)=>{
          return (
              <Pokemon
              key={p.ID}
              ID = {p.ID}
              Nombre= {p.Nombre}
              Imagen = {p.Imagen}
              Tipos ={p.Tipos}
              />
          )
      })
      }
      </div>
      {renderButton()}
    </div>
  )
}