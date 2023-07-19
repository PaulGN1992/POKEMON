
import style from '../Detail/detail.module.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPokemonId, filterTypes, deletePokemon, getAllPokemon} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";




function Detail () {
    const pokemonId = useSelector(state=>state.pokemonsId)
    const allPokemon = useSelector(state=>state.allPokemons )
    const error = useSelector((state) => state.error);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [fail, setFail] = useState('')
    const {id} = useParams()
    const dispatch = useDispatch();
    
    const handleDelete = (id)=>{
        dispatch(deletePokemon(id));
        navigate('/home');
        dispatch(getAllPokemon())
    }
   useEffect(()=>{
    dispatch(getPokemonId(id)).then(() => {
        setLoading(false)
        setFail('')
        ;}).catch((e)=>{
            setFail(`ERROR: ${e.message}`)
            setLoading(false); 
        })  
   },[allPokemon, dispatch, id])
    
    if (loading) {
        return <div>Cargando...</div>;
    } 

    return (
        <section className={style.detail}>
            {fail && (<div>{fail}</div>) }
            {id > 240 && (<div>{error}</div>)}
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
        <div><Link to='/home'><button>HOME</button></Link></div>
        </section>
        
        
          
    )
}

export default Detail;