import Modal from "../UI/Modal";

import styles from "./Cart.module.css";

import CartItem from "./CartItem";

import { useContext } from "react";
import CartContext from "../../store/cart-context";






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

  // We will display the above cart items dynamically now using context (lec 145):
  const context = useContext(CartContext);



  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };


  const cartItemAddHandler = (item) => {
    context.addItem({...item, amount: 1});
  };



  const totalAmount = `$ ${context.totalAmount.toFixed(2)}`;

  const cartItems = (
    <ul className={styles['cart-items']}>

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




  // We want to display the order button only if the cart has items:
  const hasItems = context.items.length > 0;

  return (
    <Modal onClose={props.onClose}>

      {cartItems}

      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>


      <div className={styles.actions}>
      
        <button className={styles['button--alt']} onClick={props.onClose}>
          Close
        </button>

        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;