import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import AppContext from './AppContext';
import coupons from '@/data/coupons.json'




export const CheckoutContext = createContext({subTotal:0, couponCode: "", discount:0, tip:0});



 const CheckoutProvider = ({ children }) => {

    const { cartProducts} = useContext(AppContext);

    const [couponCode, setCouponCode] = useState('');
    const [tip, setTip]= useState(0);



    const setAndValidateCouponCode = useCallback((tempCouponCode)=>{
        const newCoupon = coupons.find((c) => {
            return c.code.toUpperCase() === tempCouponCode.toUpperCase();
          });

          if (newCoupon) {
            setCouponCode(newCoupon.code.toUpperCase())
    
          return true;
        } else if(!couponCode) return false;

        return true;



    },[])








    const subTotal = useMemo(() => {
        
        let subTotal = 0;
        cartProducts.forEach((cp, i) => {
            subTotal = subTotal + cp.quantity * cp.price;
        });
        subTotal = subTotal.toFixed(2);
   
        return subTotal
      }, [cartProducts]);

  
  


    const discount = useMemo(() => {
        if (couponCode === "") {return 0;}
        
        const newCoupon = coupons.find((c) => {
          return c.code.toUpperCase() === couponCode.toUpperCase();
        });
        if (newCoupon) {
           
         return newCoupon.discountPercentage;
         
        } else {setCouponCode("");return 0;}
      },[couponCode])








      const total = useMemo(()=>{
        return (subTotal - discount*subTotal/100 + parseFloat(tip)).toFixed(2)
     }, [subTotal, discount, tip]);

  
    return (
      <CheckoutContext.Provider value={{ total,subTotal, couponCode, setAndValidateCouponCode, discount, tip, setTip }}>
        {children}
      </CheckoutContext.Provider>
    );
  };
  
  export default CheckoutProvider;