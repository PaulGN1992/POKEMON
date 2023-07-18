import style from '../pokemon/pokemon.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterTypes } from '../../redux/actions';

export default function Pokemon({ID, Nombre, Imagen, Tipos, setCurrentPage}) {
    const URL = `/detail/${ID}`
    const dispatch = useDispatch();

    const handleTypes = (type) => {
        dispatch(filterTypes(type))
        setCurrentPage(1)
      }
    return(
        <div className={style.pokemon}>
            <h2>{Nombre.toUpperCase()}</h2>
            <Link to = {URL} ><img src={Imagen} alt={Nombre}></img></Link>
            <h3> ID: {ID} </h3>
            <div>Tipo: {Tipos.map(t => 
                        {return <span key={t.Nombre}  onClick={()=>handleTypes(t.Nombre)} >{` ${t.Nombre.toUpperCase()} `}</span>})}
            </div>
        </div>

    )
}