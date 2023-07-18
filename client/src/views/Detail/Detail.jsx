
import { Link, useParams } from "react-router-dom";
import { getPokemonId, filterTypes} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";



function Detail () {
    const pokemonId = useSelector(state=>state.pokemonsId)
    const allPokemon = useSelector(state=>state.allPokemons )
    const error = useSelector((state) => state.error);
    const [loading, setLoading] = useState(true);
    const [fail, setFail] = useState('')
    const {id} = useParams()
    const dispatch = useDispatch();
    
   useEffect(()=>{
    dispatch(getPokemonId(id)).then(() => {
        setLoading(false)
        setFail('')
        ;}).catch((e)=>{
            setFail(`ERROR: ${e.message}`)
            setLoading(false); 
        })  
   },[allPokemon, dispatch, id])
    
   console.log(error)
    console.log(allPokemon)
    console.log(pokemonId)

    if (loading) {
        return <div>Cargando...</div>;
    } 

    return (
        <section>
            {fail && (<div>{fail}</div>) }
            {id > 240 && (<div>{error}</div>)}
            {
            pokemonId?.map((p)=>{
                return (
                    <div key={p.ID}>
                    <h1>Nombre : {p.Nombre.toUpperCase()}</h1>
                    <img src={p.Imagen} alt={p.Nombre} />
                    <h2>Vida: {p.Vida}</h2>
                    <h2>Ataque: {p.Ataque}</h2>
                    <h2>Defensa: {p.Defensa}</h2>
                    <h2>Velocidad: {p.Velocidad}</h2>
                    <h2>Altura: {`${p.Altura/10} metros`}</h2>
                    <h2>Peso: {`${p.Peso/10} kilogramos`}</h2>
                    <div>Tipo: {p.Tipos.map(t => 
                        {return <Link to='/home'  key={t.Nombre} ><button onClick={()=>dispatch(filterTypes(t.Nombre))}><span>{` ${t.Nombre.toUpperCase()} `}</span></button></Link>})}</div>
                    </div>
               )
            })  
            }
        <div><Link to='/home'><button>HOME</button></Link></div>
        </section>
        
        
          
    )
}

export default Detail;