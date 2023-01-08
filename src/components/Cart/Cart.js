import Modal from "../UI/Modal";

import styles from "./Cart.module.css";

import CartItem from "./CartItem";

import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import { useState } from "react";






function Cart(props) {
  //   const cartItems = (
  //     <ul className={styles["cart-items"]}>
  //       {[
  //         {
  //           id: "c1",
  //           name: "Sushi",
  //           ampunt: 2,
  //           price: 12.99,
  //         },
  //       ].map((items) => (
  //         <li key={items.id}>{items.name}</li>
  //       ))}
  //     </ul>
  //   );

  const [isCheckOut, setIsCheckOut] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false)

  // We will display the above cart items dynamically now using context (lec 145):
  const context = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const totalAmount = `$ ${context.totalAmount.toFixed(2)}`;



  const cartItems = (
    <ul className={styles["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );



  const submitOrderHandler = (userData) =>{
    setIsSubmitting(true);

    fetch('https://food-app-ae160-default-rtdb.firebaseio.com/orders.json', {

      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: context.items
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    setIsSubmitting(false);
    setDidSubmit(true);
    context.clearCart();
  }


  // We want to display the order button only if the cart has items:
  const hasItems = context.items.length > 0;




  // Now we want to hide the close and order button on when we click on order/when the user details is displayed:
  const modalActions = (
    
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>

      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );




  const cartModalContent = (
    <>
      {cartItems}
      
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}

      {!isCheckOut && modalActions} 

      {/* <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>

        {hasItems && (
          <button className={styles.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div> */}
    </>
  )

      const isSubmittingOrderData = <p>Sending Order Data...</p>

      const didSubmitModalContent = (
      <>
        <p>Successfully Sent The Order!</p>

        <div className={styles.actions}>
          <button className={styles.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </>
      )


  return (
    <Modal onClose={props.onClose}>


        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && !didSubmit && isSubmittingOrderData}
        {didSubmit && !isSubmitting && didSubmitModalContent}


      {/* {cartItems}

      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}

      {!isCheckOut && modalActions}  */}

      {/* <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>

        {hasItems && (
          <button className={styles.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div> */}
    </Modal>
  );
}

export default Cart;
