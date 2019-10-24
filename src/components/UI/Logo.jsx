import React from 'react'
import style from './Logo.module.css'
import logo from './../../assets/pokeball-drawing-4-transparent.png'

const Logo = ({isLoading, click}) => {
    let className = [style.Logo]
    if (isLoading) {
        className.push(style.Loading)
    }
    return (
        <div className={className.join(' ')} onClick={click}>
            <img src={logo} />
        </div>
    )
}

export default Logo
