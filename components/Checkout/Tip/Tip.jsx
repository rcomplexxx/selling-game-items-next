
import { useEffect, useState } from 'react'
import InputField from '../Input/InputField'
import styles from './tip.module.css'


export default function Tip({products, tip, setTip}){

    const [tipFieldOpen, setTipFieldOpen] = useState(false);
    const [selectedField, setSelectedField] =useState();
    const [fullProductCost, setFullProductCost] = useState(0);
    
    const [tipInputValue, setTipInputValue]= useState("");
    const [tipInputFocused, setTipInputFocused] = useState(false);


    useEffect(() => {
        const fullProductCostNow= products
          .reduce((sum, product) => {
            sum += product.price * product.quantity;
    
            return sum;
          }, 0)
          .toFixed(2);
    
          console.log('products cost', fullProductCostNow);
          setFullProductCost(fullProductCostNow);
      }, [products]);

      


    return <div className={styles.tipMainDiv}>
       
        <div className={styles.roundPercentWrapper}>
            <div className={`${styles.roundPercent} ${selectedField==5 && styles.selectedPercent}`} 
            onClick={()=>{
               setTipInputValue(""); setSelectedField(5); setTip((fullProductCost*5/100).toFixed(2));}}>
            <span className={styles.roundPercentSpan}>5%</span>
            <span className={styles.roundTipSpan}>${(fullProductCost*5/100).toFixed(2)}</span>
            </div>
            <div className={`${styles.roundPercent} ${selectedField==10 && styles.selectedPercent}`}
             onClick={()=>{setTipInputValue(""); setSelectedField(10); setTip((fullProductCost*10/100).toFixed(2));}}>
            <span className={styles.roundPercentSpan}>10%</span>
            <span className={styles.roundTipSpan}>${(fullProductCost*10/100).toFixed(2)}</span>
            </div>
            <div className={`${styles.roundPercent} ${selectedField==15 && styles.selectedPercent}`} 
            onClick={()=>{setTipInputValue(""); setSelectedField(15); setTip((fullProductCost*15/100).toFixed(2));}}>
            <span className={styles.roundPercentSpan}>15%</span>
            <span className={styles.roundTipSpan}>${(fullProductCost*15/100).toFixed(2)}</span>
            </div>
           
        </div>
        <div className={styles.customTipDiv}>
        <div className={styles.customTipField}>
      <input
        id="tip"
        value={tipInputValue}
        onChange={(event)=>{
            const tipValue= event.target.value;

         

            const dotIndex = tipValue.indexOf('.');
            const hasOnlyOneDot = dotIndex !== -1 && dotIndex === tipValue.lastIndexOf('.');
            
            // Check if all other characters are digits
            const areAllOtherCharsDigits = /^[0-9]+$/.test(tipValue.slice(0, -1));
            if(tipValue==="" || (hasOnlyOneDot && areAllOtherCharsDigits)){
                setTipInputValue(tipValue);
                return;
            }            

            const floatValue = parseFloat(tipValue);
            if(isNaN(floatValue) || /^-?\d*\.\d{3,}$/.test(tipValue))return;
        
            setTipInputValue(floatValue)
        }}
        onFocus={()=>{setTipInputFocused(true)}}
        onBlur={()=>{setTipInputFocused(false)}}
        placeholder=" "
        className={`${styles.customTipInput}`}
      />
        
      <label htmlFor={"tip"} className={styles.label}>
        {"Custom tip"}
      </label>

      {(tipInputValue!=="" || tipInputFocused ) && <span className={styles.dollarSign}>$ </span>}

        </div>
        <span className={`${styles.addTip} ${tipInputValue=="" && styles.addTipDisabled}`}
        onClick={()=>{
            setSelectedField(0);
            if(tipInputValue=="")setTip(0);
            else setTip(parseFloat(tipInputValue).toFixed(2));
        }}    >{tip==0?"Add tip":"Update tip"}</span>
      


        </div>
            <span className={styles.thankYouMessage}>Thank you for supporting us.</span>

    </div>
}