import axios from "axios";

export const NotInitializedType = "NotInitialized";
export const FetchedType = "Fetched";
export const FetchingType = "Fetching";
export const FailFetchedType = "FailFetched";

export const NotInitialized = value => ({ type: NotInitializedType, value });
export const Fetched = value => ({ type: FetchedType, value });
export const Fetching = value => ({ type: FetchingType, value });
export const FailFetched = value => ({ type: FailFetchedType, value });

const url = 'https://pokeapi.co/api/v2/pokemon/'

export const getData = ids =>
  ids.map(id => axios.get(`${url}${id}`)
    .then(resp => Fetched(resp.data))
    .catch(error => FailFetched(error))
  );

export const getSearch = name => {
  name = name.toLowerCase()
  return  axios.get(`${url}${name}`)
    .then(resp => {
      console.log(resp)
      return Fetched(resp.data)
    })
    .catch(error => {
      console.log(error)
      return FailFetched(error)
    })

}
  


