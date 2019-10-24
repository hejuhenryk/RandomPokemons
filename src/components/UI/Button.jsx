import React from 'react'
import styles from './Button.module.css'

const Button = ({click, type, disabled, ...props}) => <button 
    disabled={disabled}
    className={[styles.Button, styles[type]].join(' ')} 
    onClick={click}>
    {props.children}
</button>

export default Button
