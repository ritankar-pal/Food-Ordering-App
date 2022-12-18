import React from 'react';

import styles from './Input.module.css';


const Input = React.forwardRef((props, ref) => {
    
    return(
        <div className={styles.input}>

            {/* We can write like this */}
            {/* <label htmlFor={props.id}>{props.label}</label>
            <input type={props.type} id={props.id} min={props.min} max={props.max} step={props.step} defaultValue={props.defaultValue}/> */}


            {/* We can also write like this */}
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input}/>

        </div>
    )
}); 

export default Input;
