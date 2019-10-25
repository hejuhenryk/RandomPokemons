import React, { useState } from 'react'
import styles from './RundomPokemons.module.css'
import Header from './components/UI/Header'
import { useGetPokemons } from './hooks/useGetPokemons'
import { Card, Selected } from './components/Card'

// const reducer = (state, action) => {
//   return state
// }

export const RundomPokemons = () => {
  const [poks, removePok] = useGetPokemons(2)
  const [selected, setSelected] = useState(null)

  const onChoosed = id => {
    setSelected({...poks[id]})
  }


  console.log(selected)
  const showInCards = []
  for( const pokemon in poks) {
    showInCards.push(
      <Card 
        key={pokemon} 
        isLoading={poks[pokemon].isLoading} 
        isError={poks[pokemon].isError} 
        removePokemon={()=>removePok(pokemon)}
        data={poks[pokemon].data}
        choosed={()=>onChoosed(pokemon)}
        />)
  }
  return (
    <div className={styles.RundomPokemons}>
      <Header />
      <div className={styles.Selected}>
        {selected ? <Selected data={selected.data} removePokemon={()=>setSelected(null)}/> : null}
      </div>
      <div className={styles.Results}>
        {showInCards}
      </div>
    </div>
  )
}

