import axios from 'axios';

export const GET_ALLPOKEMON = "GET_ALLPOKEMON";
export const GET_POKEMON_NAME ="GET_POKEMON_NAME";
export const GET_TYPES = "GET_TYPES";
export const FILTER_TYPES = "FILTER_TYPES";
export const RESET = "RESET";
export const GET_POKEMON_ID = "GET_POKEMON_ID";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const FILTER_CREATE = 'FILTER CREATE';
export const ORDER_ATTACK = 'ORDER_ATTACK';
export const ORDER_NAME = 'ORDER_NAME';
export const DELETE_POKEMON = 'DELETE_POKEMON'

export const createPokemon = (pokemonData)=>{
    return async (dispatch) => {
        const URL = "http://localhost:3001/pokemons"
        try {
            await axios.post(URL, pokemonData)
            return dispatch({
                type : CREATE_POKEMON,
                payload : '',
                check: 'Creado con exito'
            })
        } catch (error) {
            return dispatch({
                type : CREATE_POKEMON,
                payload : 'No se pudo crear al pokemon'
            })
        }
    }
}

export const getAllPokemon = ()=> {
    return async (dispatch) => {
        const URL = "http://localhost:3001/pokemons";
        const {data} = await axios.get(URL);
        return dispatch({
            type : GET_ALLPOKEMON,
            payload : data
        })
    }
}
export const getPokemonId = (id) => {
    return async (dispatch) => {
        const URL = `http://localhost:3001/pokemons/${id}`;
        try {
            const {data} = await axios.get(URL);
            return dispatch({
                type : GET_POKEMON_ID,
                payload : data
            })
        } catch (error) {
            // return dispatch({
            //     type: GET_POKEMON_ID,
            //     payload: null,
            // });
            throw new Error('No se encontro al pokemon en la API')

        }
    }
}

export const getPokemonName = (Nombre) => {
    return async (dispatch) => {
        const URL = `http://localhost:3001/pokemons?name=${Nombre}`;
        try {
            const {data} = await axios.get(URL);
            return dispatch({
                type : GET_POKEMON_NAME,
                payload : data
            })
        } catch (error) {
            return dispatch({
                type : GET_POKEMON_NAME,
                payload : error
            })
        }
    }
}

export const getTypes = () =>{
    return async (dispatch) => {
        const URL = `http://localhost:3001/types`;
        const {data} = await axios.get(URL);
        return dispatch({
            type : GET_TYPES,
            payload : data
        })
    }
}

export const filterTypes = (Tipo) =>{
    return {
        type : FILTER_TYPES,
        payload : Tipo,
    }
}

export const filterCreate = (typeCreate) =>{
    return {
        type : FILTER_CREATE,
        payload : typeCreate,
    }
}

export const orderAttack = (ataque) =>{
    return {
        type : ORDER_ATTACK,
        payload : ataque,
    }
}

export const orderName = (order) =>{
    return{
        type :ORDER_NAME,
        payload: order,
    }
}
export const resetPokemons = ()=>{
    return {
        type: RESET
    }
}

export const deletePokemon = (ID)=> {
    return async (dispatch) => {
        const URL = `http://localhost:3001/pokemons/${ID}`;
        try {
            await axios.delete(URL);
            return dispatch({
                type : DELETE_POKEMON,
                payload : '',
            })
        } catch (error) {
            return dispatch({
                type : DELETE_POKEMON,
                payload : error.message
            })
        }
    }
}