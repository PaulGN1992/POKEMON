import {GET_ALLPOKEMON,
     GET_POKEMON_NAME, 
     GET_TYPES, 
     CREATE_POKEMON,
     FILTER_TYPES, 
     GET_POKEMON_ID,
     RESET} from './actions';

let initialStore = {
    pokemonsName: [],
    pokemonsId: [],
    allPokemons: [],
    copyPokemons: [],
    types: [],
    check: [],
    error: "",
};

export default function rootReducer(state = initialStore, action) {
    switch(action.type) {
        case GET_ALLPOKEMON: return{
            ...state,
            allPokemons: action.payload,
            copyPokemons: action.payload
        }
        case CREATE_POKEMON: return{
            ...state,
            error: action.payload,
            check: action.check
        }
        case GET_POKEMON_NAME: 
        const searchPokemon = state.copyPokemons.filter((p)=> p.Nombre === action.payload.Nombre)
          if(searchPokemon.length>0) {
            return {
                ...state,
              pokemonsName: searchPokemon,
              error: '',
            };
          } else {
            return {
              ...state,
              error: 'No existe ese pokemon',
            };
        } 
      
        case GET_TYPES: return {
            ...state,
            types: action.payload,
        }

        case GET_POKEMON_ID: 

        const filteredPokemons = state.copyPokemons.filter(
            (p) => p.ID === action.payload.ID
          );
          if (filteredPokemons.length > 0) {
            return {
              ...state,
              pokemonsId: filteredPokemons,
              error: "", 
            };
          } else {
            return {
              ...state,
              error: "No se encontró ningún pokemon con ese ID.",
            };
          }

        case FILTER_TYPES: return {
            ...state,
            allPokemons: state.copyPokemons.filter(pokemon =>
                pokemon.Tipos.some(tipo => tipo.Nombre === action.payload))
        }

        case RESET: return {
            ...state,
            allPokemons: state.copyPokemons,
            pokemonsName: [],
            error: ""
        }
        default: return{
            ...state
        }
    }
}