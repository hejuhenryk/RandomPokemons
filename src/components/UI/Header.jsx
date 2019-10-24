import React from 'react'
import style from './Header.module.css'
import Logo from './Logo';


const Header = (props) => {
    return (
        <div className={style.Header}>
            <Logo isLoading={false} click={()=>console.log('reload rundom cards')}/>
            <p onClick={props.aboutClicked}>About</p>
        </div>
    )
}

export default Header
