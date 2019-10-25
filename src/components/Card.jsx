import React, {Fragment} from "react";
import { Avatar } from "./Avatar";
import style from "./Card.module.css";
// import Logo from "./UI/Logo";

export const Card = ({ removePokemon, isLoading, isError, data, choosed, ...props}) => {
  
  let avatar = null
  let info = null
  if ( isLoading ) {
    avatar = <Avatar isLoading={isLoading}/>
  } else if ( isError ) {
    avatar = <p>Erroo</p>
  } else if ( !isLoading && !isError && data ) {
    console.log(data)
    avatar = <Avatar url={data.sprites.front_default} isLoading={isLoading}/>
    info = <div className={style.Info}>{data.name}</div>
  }


  return (
    <div className={style.Card} onClick={isLoading || isError ? ()=>{} : choosed}>
      <Fragment >
        <button style={{zIndex: 10}} onClick={removePokemon}>X</button>
        <div  style={{ cursor: "pointer" }}>
        {avatar}
        </div>
        {info}
      </Fragment>
    </div>
  );
};


export const Selected = ({data, removePokemon, ...props}) => {
  
  const pokemon = data;
  return (
      <div className={style.Selected}>
        <div>
          <button style={{zIndex: 10}} onClick={removePokemon}>X</button>
          <Avatar url={pokemon.sprites.front_default} />
          <p style={{textTransform: 'capitalize'}}>{pokemon.name}</p>
        </div>
        <div>
          <p>Types: {pokemon.types.reduce( (reduced, cur, i) => reduced + `${ i===0 ? '' : ' and '}${cur.type.name}`, '' ) } </p>
          <p>Pokedex nr: #{pokemon.id} </p>
          <p>Special abilities:</p>
          <ul>
            {pokemon.abilities.map( (abi, indx) => <li key={indx}>{abi.ability.name}</li>)}  
          </ul>

        </div>
      </div>
  )
}
/* 
appearance: {gender: "Male", race: "Human", height: Array(2), weight: Array(2), eye-color: "Yellow", …}
biography: {full-name: "Richard Milhouse Jones", alter-egos: "No alter egos found.", aliases: Array(1), place-of-birth: "Scarsdale, Arizona", first-appearance: "Hulk Vol 2 #2 (April, 2008) (as A-Bomb)", …}
connections: {group-affiliation: "Hulk Family; Excelsior (sponsor), Avengers (honora…ica and Captain Marvel; Teen Brigade; ally of Rom", relatives: "Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Ch…ased); Jackie Shorr (alleged mother; unconfirmed)"}
id: "1"
image: {url: "https://www.superherodb.com/pictures2/portraits/10/100/10060.jpg"}
name: "A-Bomb"
powerstats: {intelligence: "38", strength: "100", speed: "17", durability: "80", power: "24", …}
response: "success"
work: {occupation: "Musician, adventurer, author; formerly talk show host", base: "-"}
__proto__: Object
*/