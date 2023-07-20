import {GET_ALLPOKEMON,
     GET_POKEMON_NAME, 
     GET_TYPES, 
     CREATE_POKEMON,
     FILTER_TYPES, 
     GET_POKEMON_ID,
     RESET,
     FILTER_CREATE,
     ORDER_NAME,
     ORDER_ATTACK,
     DELETE_POKEMON} from './actions';

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

        case FILTER_CREATE: return {
          ...state,
          allPokemons: state.copyPokemons.filter(pokemon =>
              pokemon.Creado === action.payload)
        }

        case ORDER_ATTACK: 
        
        let ordenados;
        if (action.payload === "Fuerte-debil") {
            ordenados = state.allPokemons.sort((a, b) => (a.Ataque < b.Ataque ? 1 : -1));
        } else {
            ordenados = state.allPokemons.sort((a, b) => (b.Ataque < a.Ataque ? 1 : -1));
        }
        return {
        ...state,
        allPokemons: [...ordenados],
        };

        case ORDER_NAME: 
        
        let ordenadosN;
        if (action.payload === "A-Z") {
            ordenadosN = state.allPokemons.sort((a, b) => (a.Nombre > b.Nombre ? 1 : -1));
        } else {
            ordenadosN = state.allPokemons.sort((a, b) => (b.Nombre > a.Nombre ? 1 : -1));
        }
        return {
        ...state,
        allPokemons: [...ordenadosN],
        };

        case DELETE_POKEMON:
        return {
          ...state,
          error: action.payload,
        }
        case RESET: 
        
          const integers = [];
          const uuids = [];

          state.copyPokemons.forEach(pokemon => {
            if (typeof pokemon.ID === 'number') {
              integers.push(pokemon);
            } else {
              uuids.push(pokemon);
            }
          });

          const sortedIntegers = integers.sort((a, b) => a.ID - b.ID);
          const sortedUUIDs = uuids.sort((a, b) => (a.ID < b.ID ? -1 : 1));
          const ordenadosT = [...sortedIntegers, ...sortedUUIDs];
  
        return {
            ...state,
            allPokemons: [...ordenadosT],
            pokemonsName: [],
            error: "",
            check: [],            
        }

        default: return{
            ...state
        }
    }
}