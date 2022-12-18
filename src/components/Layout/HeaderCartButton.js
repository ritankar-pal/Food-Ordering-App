import styles from './HeaderCartButton.module.css'

import CartIcon from "../Cart/CartIcon";

import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';







function HeaderCartButton(props) {

  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const context = useContext(CartContext);


  const numberOfCartItems = context.items.reduce((curNumber, item) =>{

      return curNumber + item.amount;
  }, 0)

  // console.log(numberOfCartItems)


  const btnClasses = `${styles.button} ${buttonIsHighlighted ? styles.bump:''}`;



  const {items} = context;                //object destructuring
  
  useEffect(()=>{
    console.log('useEffect')

    // if we write this then whatever changes in cart will trigger this action but we need only items
    // if(context.items.length === 0){
    //   return
    // }

    if(items.length === 0){
      return
    }

    setButtonIsHighlighted(true)

    const timer = setTimeout(()=>{
      setButtonIsHighlighted(false)
    }, 300)

    return () =>{
      console.log('CLEAN UP'); 
      clearTimeout(timer);
    }

  }, [items])



  return (
    <>
      <button className={btnClasses} onClick={props.onClick}>

      {/* If we want the data to be passed using context in button */}
      {/* <button className={styles.button} onClick={context.onShowCart}> */}

        <span className={styles.icon}> <CartIcon/> </span>

        <span>Your Cart</span>

        <span className={styles.badge}>{numberOfCartItems}</span>

      </button>
    </>
  );
}

export default HeaderCartButton;
