import React from "react";

const AuthContext = React.createContext({

    // Below code is if we want to use context in opening and closing the modal:

    cartIsShown: false, 

    onShowCart: () =>{

    }

    

});

export default AuthContext;