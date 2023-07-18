import style from '../navBar/navBar.module.css';
import {Link, useNavigate } from 'react-router-dom'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonName, resetPokemons } from '../../redux/actions';


export default function NavBar (){
    const [searchPokemon, setSearchPokemon] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const errors = useSelector(state => state.error)
    const [showError, setShowError] = useState(false)
    
    const handleInputChange = (event) => {
      setSearchPokemon(event.target.value);
    };
    const handleSearch = ()=> {
      dispatch(getPokemonName(searchPokemon))
      setSearchPokemon("");
      navigate('/home')
    };
    
    useEffect(()=>{
      if(errors === 'No existe ese pokemon') {
        setShowError(true)
      } else {
        setShowError(false)
      }
    },[handleSearch])
    console.log(errors)
    return(
      <div className={style.navBar}>
        <div>
          <Link to='/home'>
            <button onClick={()=> dispatch(resetPokemons())}>INICIO</button>
            </Link>
           <Link to='/form'><button>CREAR POKEMON</button></Link>
        </div>
        <div className={style.search}>
            <input placeholder="Buscar por nombre" type="search" value={searchPokemon} onChange={handleInputChange}/>
            <button onClick={handleSearch}>Buscar</button>
        {showError && <span>No existe ese Pokemon</span> }
        </div>
       </div>
   )
   }