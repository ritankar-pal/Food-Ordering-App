import { useRef, useState } from 'react';

import styles from './MealItemForm.module.css';

import Input from '../../UI/Input';




function MealItemForm(props) {

    const [amountIsvalid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();   //food quantity to be ordered


    
    const onSubmitHandler =(event) =>{
        event.preventDefault(); 
        
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber= +enteredAmount;

        // console.log(enteredAmount);

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false);

            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }


    return(

        <form className={styles.form} onSubmit={onSubmitHandler}>

            {/* <Input label='Amount' type='number' id='amount' min='1' max='5' step='1' defaultValue='1'/> */}


            <Input label='Amount' ref={amountInputRef} input={{
            
                label:'Amount',
                type:'number',
                id:'amount_' + props.id,   //this is done so that every input has a different id atleast. It is passed to MealItemForm
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}/>

            <button>+ Add</button>

            {!amountIsvalid && <p>Please Enter a Valid Order Quantity.</p>}
        </form>
    )
}; 

export default MealItemForm;