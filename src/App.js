import Header from "./components/Layout/Header";

import Meals from "./components/Meals/Meals";

import Cart from "./components/Cart/Cart";

import { useState } from "react";

// import AuthContext from "./store/auth-context";

import CartProvider from "./store/CartProvider";



function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
    
      <CartProvider>
      
        {cartIsShown && <Cart onClose={hideCartHandler}> </Cart>}

        {/* If we want to use useContext to make the cart button */}
        {/* <AuthContext.Provider value={{cartIsShown: cartIsShown, onShowCart: showCartHandler}}>

          <Header></Header>

      </AuthContext.Provider> */}

        <Header onShowCart={showCartHandler}></Header>

        <main>
          <Meals />
        </main>


      </CartProvider>
    </>
  );
}

export default App;
