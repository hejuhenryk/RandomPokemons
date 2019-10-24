import React, {Fragment} from 'react'
import styles from './Modal.module.css'
import {Backdrop} from './Backdrop';
import Button from "./Button";


const Modal = (props) => {
    return (
        <Fragment>
            <div
                className={styles.Modal}
                style={{
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
                <Button name={'Close'} btn={props.closemodal}/>
            </div>
            <Backdrop show={props.show} clicked={props.closemodal} />

        </Fragment>
    )
}

export default Modal
