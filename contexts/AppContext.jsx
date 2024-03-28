import { createContext } from 'react';

const AppContext = createContext({cartProducts: [], setCartProducts: ()=>{}});

export default AppContext;