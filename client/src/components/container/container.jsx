import Pokemon from '../pokemon/pokemon';
import style from '../container/container.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { filterCreate, filterTypes, orderAttack, orderName, resetPokemons } from '../../redux/actions';

export default function Container (){
  const pokemons = useSelector(state=> state.allPokemons);
  const pokemonsName = useSelector(state=> state.pokemonsName);
  const typesPokemon = useSelector(state => state.types);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [filter, setFilter] = useState("");
  const [orderA, setOrderA] = useState("");
  const [orderN, setOrderN] = useState("");
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

  const handleOrderAttack=(e)=>{
    setOrderA(e.target.value);
    dispatch(orderAttack(e.target.value))
  }

  const handleOrderName=(e)=>{
    setOrderN(e.target.value);
    dispatch(orderName(e.target.value))
  }

  const handleTypes = (e) => {
    setSelectedType(e.target.value);
    dispatch(filterTypes(e.target.value))
  }

  const handleCreate = (e) => {
    setFilter(e.target.value);
    if(e.target.value === 'API') {
      dispatch(filterCreate(false))
    } else {
      dispatch(filterCreate(true))
    }
  }
  const handleReset = () =>{
    dispatch(resetPokemons())
    setCurrentPage(1)
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, filter, orderA, orderN]);

  const renderButton = ()=> {
    return pokemonsName.length > 0? (
      <button onClick={()=>dispatch(resetPokemons())}>Ver todos</button>
  ) : (
    <div className={style.botonBusqueda}>
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
        <span onChange={handleTypes}>{`FILTRAR POR TIPO:  `}
          <select>{typesPokemon.map((type)=>(<option key={type.ID} value={type.Nombre}>{type.Nombre}</option>))}</select>
        </span>
        <span onChange={handleCreate}>{`FILTRAR POR CREACION:  `}
          <select>{["API", "CREADO"].map((f)=>(<option key={f} value={f}>{f}</option>))}</select>
        </span>
        {renderButton()}
        <span  onChange={handleOrderAttack}>ORDENAR POR FUERZA:  
          <select>{["Fuerte-debil", "Debil-Fuerte"].map((f)=>(<option key={f} value={f}>{f}</option>))}</select></span>
          <span  onChange={handleOrderName}>ORDENAR POR NOMBRE:  
          <select>{["A-Z", "Z-A"].map((n)=>(<option key={n} value={n}>{n}</option>))}</select></span>
      </div>
      <button className={style.reset} onClick={handleReset}>RESET</button>
      <div className={style.container}>
      {currentPokemon.map((p)=>{
          return (
              <Pokemon
              key={p.ID}
              ID = {p.ID}
              Nombre= {p.Nombre}
              Imagen = {p.Imagen}
              Tipos ={p.Tipos}
              setCurrentPage = {setCurrentPage}
              />
          )
      })
      }
      </div>
      {renderButton()}
      
    </div>
  )
}