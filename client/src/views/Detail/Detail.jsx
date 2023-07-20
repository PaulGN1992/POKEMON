
import style from '../Detail/detail.module.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPokemonId, filterTypes, deletePokemon, getAllPokemon, resetPokemons} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Detail () {
    const pokemonId = useSelector(state=>state.pokemonsId)
    const allPokemon = useSelector(state=>state.allPokemons )
    const error = useSelector((state) => state.error);
    const navigate = useNavigate();
    const [fail, setFail] = useState('')
    const {id} = useParams()
    const dispatch = useDispatch();
    const [isFirstPokemon, setIsFirstPokemon] = useState(false);
    const [isLastPokemon, setIsLastPokemon] = useState(false);
    const indexPokemon = () =>{
    const foundIndex = allPokemon.findIndex((pokemon) => pokemon.ID.toString() === id.toString());
        return foundIndex !== -1 ? foundIndex : 0; 
    }
    const [currentPokemonIndex, setCurrentPokemonIndex] = useState(indexPokemon());
    const handleDelete = (id)=>{
        dispatch(deletePokemon(id));
        navigate('/home');
        dispatch(getAllPokemon())
    }
   useEffect(()=>{

    if (currentPokemonIndex >= 0) {
        setIsFirstPokemon(currentPokemonIndex === 0);
        setIsLastPokemon(currentPokemonIndex === allPokemon.length - 1);
      } else {
        setIsFirstPokemon(false);
        setIsLastPokemon(false);
      }
    dispatch(getPokemonId(id)).then(() => {
        setFail('')
        ;}).catch((e)=>{
            setFail(`ERROR: ${e.message}`); 
        });
   },[allPokemon, currentPokemonIndex, dispatch, id])


   function getNextId() {
    const nextIndex = currentPokemonIndex+1;
    if (nextIndex >= 0 && nextIndex < allPokemon.length) {
      return allPokemon[nextIndex].ID;
    }
    return 0;
    }

    function getPrevId() {
        const prevIndex = currentPokemonIndex-1;
    if (prevIndex >= 0 && prevIndex < allPokemon.length) {
        return allPokemon[prevIndex].ID;
    }
    return 0;
    }

    console.log(getNextId())
    console.log(getPrevId())

   function handlePrevious() {
    navigate(`/detail/${getPrevId()}`);
    setCurrentPokemonIndex(currentPokemonIndex-1);
  }
  
  function handleNext() {
    navigate(`/detail/${getNextId()}`);
    setCurrentPokemonIndex(currentPokemonIndex+1)
  }

    return (
        <section className={style.detail}>
            {fail && (<div>{fail}</div>) }
            {id > 360 && (<div>{error}</div>)}
            <button onClick={handlePrevious} disabled={isFirstPokemon}>
        Previous
      </button>
        <button onClick={handleNext} disabled={isLastPokemon}>
        Next
      </button>
            {
            pokemonId?.map((p)=>{
                return (
                    <div key={p.ID}>
                    <div className={style.datos}>
                    <img src={p.Imagen} alt={p.Nombre} />
                    <div>
                    <h1>{p.Nombre.toUpperCase()}</h1>
                    <h2>Vida: {p.Vida}</h2>
                    <h2>Ataque: {p.Ataque}</h2>
                    <h2>Defensa: {p.Defensa}</h2>
                    <h2>Velocidad: {p.Velocidad}</h2>
                    <h2>Altura: {`${p.Altura/10} metros`}</h2>
                    <h2>Peso: {`${p.Peso/10} kilogramos`}</h2>
                    <div>Tipo: {p.Tipos.map(t => 
                        {return <Link to='/home'  key={t.Nombre} ><button className={style[t.Nombre]} onClick={()=>dispatch(filterTypes(t.Nombre))}><span>{` ${t.Nombre.toUpperCase()} `}</span></button></Link>})}</div>
                    {p.Creado === true && <button onClick={()=>{handleDelete(p.ID)}}>Eliminar Pokemon</button>}    
                    </div>
                    </div>
                    </div>
               )
            })  
            }
        <div><Link to='/home'><button>Regresar</button></Link></div>
        </section>
        
        
          
    )
}

export default Detail;