import React from "react";
import unknown from "../assets/unknownHero.png";
import style from "./Avatar.module.css";
import Logo from "./UI/Logo";

export const Avatar = ({url, isLoading}) => {
  let avatar = null 
  if ( isLoading ) {
    avatar = <div className={style.Avatar} style={{border: 0}}><Logo isLoading /></div>
  } else {
    avatar = <div 
      className={style.Avatar}
      style={{ backgroundImage: `url(${url || unknown})` }}
    />
  }
  return avatar
}


