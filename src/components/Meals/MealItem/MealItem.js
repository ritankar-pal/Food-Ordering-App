import styles from "./MealItem.module.css";

import MealItemForm from "./MealItemForm";

import { useContext } from "react";
import CartContext from "../../../store/cart-context";



function MealItem (props) {

  const context = useContext(CartContext);

  const price = props.price.toFixed(2);



  const addToCartHandler = (amount) =>{
    context.addItem({

      id: props.id, 
      name: props.name, 
      amount: amount,                  //this is the quantity of food being ordered
      price: props.price

    })
  }



  return (

    <li className={styles.meal}>


      <div>
        <h3>{props.name}</h3>

        <div className={styles.description}>
            {props.description}
        </div>

        <div className={styles.price}>
            {`$${price}`}
        </div>
      </div>

    

      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler}/> 
      </div>
 

    </li>
  );
}

export default MealItem;
