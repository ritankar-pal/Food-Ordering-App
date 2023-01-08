import { useReducer } from 'react';

import CartContext from "./cart-context";





const defaultCartState = {    //Initial State of the cart.
    items: [],               // item will contain a price and amount(quantity to be ordered)
    totalAmount: 0,
};




const cartReducer = (state, action) =>{

    if(action.type === "ADD") {

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        
        //Lec 146: to update the quantity of a particular food item in the cart: 

        //To get the index no of the item: 
        const existingCartItemIndex = state.items.findIndex((item)=>(
            item.id === action.item.id
        ));
        // console.log(existingCartItemIndex);


        //this variable will store the item with the id obtained above: 
        const existingCartItem = state.items[existingCartItemIndex];

        // let updatedItem;
        let updatedItems; 
        

        if(existingCartItem){

           const updatedItem = {
                ...existingCartItem, 
                amount: existingCartItem.amount + action.item.amount
            }; 

            updatedItems = [...state.items];
            // console.log(updatedItems);
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);    // this is when we are adding a new food item in the cart
        }


        // const updatedItems = state.items.concat(action.item);                     //name, amount, price everything will be here.

        return {  
            items: updatedItems, 
            totalAmount: updatedTotalAmount
        }
    }



    if (action.type === 'REMOVE') {

        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.id
        );

        const existingItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price; 

        let updatedItems;

        if (existingItem.amount === 1) {
          updatedItems = state.items.filter(item => item.id !== action.id);
        } else {

          const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount
        };
    }
    

    if(action.type === 'CLEAR'){
        
        return defaultCartState;
    }

    return defaultCartState;
};

   



function CartProvider(props) {
    
    const [cartState, dispatchCartAction ] = useReducer(cartReducer, defaultCartState)




    const addItemToCartHandler = (item) =>{

        dispatchCartAction({type: "ADD", item: item})
    };



    const removeItemFromCartHandler = (id) =>{

        dispatchCartAction({type: "REMOVE", id: id})
    }


    const clearCartHandler = () =>{
        dispatchCartAction({type: "CLEAR"});
    } 


    const cartContext = {
        items: cartState.items, 
        totalAmount: cartState.totalAmount, 
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    }
    

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}; 

export default CartProvider;