import { useReducer, useEffect, useState } from 'react'
import axios from 'axios'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCHING':
            return { ...state, isError: '', isLoading: true }
        case 'FETCHED':
            return { ...state, isLoading: false, data: action.payload }
        case 'FAIL_FETCHED':
            return { ...state, isLoading: false, isError: action.payload }
        default:
            throw new Error('Wrong action type')
    }
}

export const useDataService = (initialUrl, initalData) => {
    const [url, setUrl] = useState(initialUrl)
    const initialState = {
        isError: '',
        isLoading: false,
        data: initalData
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        let didComponentUnmounted = false

        const fetchData = () => {
            dispatch({type: 'FETCHING'})
            axios(url)
                .then( res => dispatch({type: 'FETCHED', payload: res}))
                .catch( err => dispatch({type: 'FAIL_FETCHED', payload: err}))
        }
        fetchData()
        return () => {
            didComponentUnmounted = true
        };
    }, [url])


    return [state, setUrl]
}