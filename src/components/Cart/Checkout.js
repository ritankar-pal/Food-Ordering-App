import { useState } from "react";
import { useRef } from "react";
import styles from "./Checkout.module.css";




//Helper function's for validation:
const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim() === 5;



function Checkout(props) {

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true, 
    street: true,
    postal: true,
    city: true
  })


  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();



  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    //Basic Form Validation: 
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);


    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postal: enteredPostalCodeIsValid, 
        city: enteredCityIsValid
    })

    const formIsVaid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if(!formIsVaid){
        return;
    }
    

  };


  //Styling the validity conditionally:
  const nameInputClasses = `${styles.control} ${formInputsValidity.name ? '': styles.invalid}`
  const streetInputClasses = `${styles.control} ${formInputsValidity.street ? '': styles.invalid}`
  const postalInputClasses = `${styles.control} ${formInputsValidity.postal ? '': styles.invalid}`
  const cityInputClasses = `${styles.control} ${formInputsValidity.city ? '': styles.invalid}`


  return (
    <form className={styles.form} onSubmit={confirmHandler}>

      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}/>

        {!formInputsValidity.name && <p>Please Enter A Valid Name</p>}
      </div>

      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>

        {!formInputsValidity.street && <p>Please Enter A Valid Street</p>}
      </div>

      <div className={postalInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef}/>

        {!formInputsValidity.postal && <p>Please Enter A Postal Code</p>}
      </div>

      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}/>

        {!formInputsValidity.city && <p>Please Enter A Valid City</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>

        <button className={styles.submit}>Confirm</button>
      </div>

    </form>
  );
}

export default Checkout;
