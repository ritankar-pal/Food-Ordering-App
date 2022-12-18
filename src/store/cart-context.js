import React from "react"

const CartContext= React.createContext({

    items:[], 

    totalAmount: 0, 

    addItem: (item) =>{

    }, 
    
    removeItem: (id)=>{
        
    }
}); 

export default CartContext;


//We will create a CartProvider.js to get access to the CartContext items and then use the CartProvider component where-ever we need