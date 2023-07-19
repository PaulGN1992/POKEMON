import style from '../navBar/navBar.module.css';
import logo from '../../assent/pokemonLogo.png'
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

    const handleClick = ()=>{
        navigate('/home')
        dispatch(resetPokemons())
    }
    
    useEffect(()=>{
      if(errors === 'No existe ese pokemon') {
        setShowError(true)
        setTimeout(() => {
          setShowError(false);
        }, 1000);
      } 
    },[errors])

    console.log(errors)
    return(
      <div className={style.navBar}>
        <div className={style.botones}>
          <div><Link to='/home'>
            <button onClick={()=> dispatch(resetPokemons())}>INICIO</button>
          </Link>
          <Link to='/form'><button>CREAR POKEMON</button></Link></div>
        </div>
        <div><img src={logo} alt="logoPokemon" onClick={()=>handleClick()} /></div>
        <div className={style.search}>
            <input placeholder="Buscar por nombre" type="search" value={searchPokemon} onChange={handleInputChange}/>
            <button onClick={handleSearch}>Buscar</button>
        {showError && <span>No existe ese Pokemon</span> }
        </div>
       </div>
   )
   }