import { useReducer, useEffect, useState, useCallback } from 'react'
import axios from 'axios'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCHING':
            return { ...state, [action.id]: { isError: '', isLoading: true, data: {} } }
        case 'FETCHED':
            return { ...state, [action.id]: { isError: '', isLoading: false, data: action.data }}
        case 'FAIL_FETCHED':
            return { ...state, [action.id]: { isError: action.error, isLoading: true, data: {} } }
        case 'ADD_POKEMON':
            return { ...state, [action.id]: {data: action.data}}
        case 'REMOVE_POKEMON': 
            const { [action.id]: remove , ...newState } = state
            return newState
        default:
            throw new Error('Wrong action type')
    }
}

export const useGetPokemons = (amount) => {
    const [pokemonsData, dispatch] = useReducer(reducer, {})

    const getRndUnicPokemon = useCallback( pokemons => {
        const id = Math.floor(Math.random() * 808)
        return pokemons[id] ? getRndUnicPokemon(pokemons) : id
    }, [])



    const addPokemon = () => dispatch({type:'ADD_POKEMON', id: getRndUnicPokemon(pokemonsData), data: null})

    const removePokemon = id => dispatch({type: 'REMOVE_POKEMON', id: id})

useEffect(() => {
    if( Object.keys(pokemonsData).length < amount ) {
        addPokemon()
    } else {
        for (const id in pokemonsData) {
            if (!pokemonsData[id].data) {
            const fetchData = () => {
                dispatch({type: 'FETCHING', id: id})
                axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then( res => dispatch({type: 'FETCHED', data: res.data, id: id}))
                    .catch( err => dispatch({type: 'FAIL_FETCHED', error: err, id: id}))
            }
            fetchData()
            }
        }
    }
}, [pokemonsData])
    
    
    // const [url, setUrl] = useState(initialUrl)
    // const initialState = {
    //     isError: '',
    //     isLoading: false,
    //     data: initalData
    // }
    // const [state, dispatch] = useReducer(reducer, initialState)

    // useEffect(() => {
    //     let didComponentUnmounted = false

    //     const fetchData = () => {
    //         dispatch({type: 'FETCHING'})
    //         axios(url)
    //             .then( res => dispatch({type: 'FETCHED', payload: res}))
    //             .catch( err => dispatch({type: 'FAIL_FETCHED', payload: err}))
    //     }
    //     fetchData()
    //     return () => {
    //         didComponentUnmounted = true
    //     };
    // }, [url])


    return [pokemonsData, removePokemon] 
}