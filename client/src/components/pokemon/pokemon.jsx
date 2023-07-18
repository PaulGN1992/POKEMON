import style from '../pokemon/pokemon.module.css';
import { Link } from 'react-router-dom';

export default function Pokemon({ID, Nombre, Imagen, Tipos}) {
    const URL = `/detail/${ID}`
    return(
        <div className={style.pokemon}>
            <h2>{Nombre.toUpperCase()}</h2>
            <Link to = {URL} ><img src={Imagen} alt={Nombre}></img></Link>
            <h3> ID: {ID} </h3>
            <div>Tipo: {Tipos.map(t => {return <span key={t.Nombre} className={style[t.Nombre]}>{` ${t.Nombre.toUpperCase()} `}</span>})}</div>
        </div>

    )
}