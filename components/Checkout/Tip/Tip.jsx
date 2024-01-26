
import { useEffect, useRef, useState } from 'react'
import InputField from '../Input/InputField'
import styles from './tip.module.css'
import Image from 'next/image';


export default function Tip({products, tip, setTip}){

    const [tipShow, setTipShow] = useState(false);
    const [selectedField, setSelectedField] =useState();
    const [fullProductCost, setFullProductCost] = useState(0);
    
    const [tipInputValue, setTipInputValue]= useState("");
    const [tipInputFocused, setTipInputFocused] = useState(false);
    const [applyDisabled, setApplyDisabled] = useState(true);
    const [tipError, setTipError] = useState();
    const visibilityTimeout = useRef();


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


  useEffect(()=>{

          clearTimeout(visibilityTimeout.current);
          const tipDiv= document.getElementById("tipDiv")
          if(tipShow){



         
            tipDiv.style.maxHeight=`${ tipDiv.scrollHeight}px`;
          visibilityTimeout.current=setTimeout(()=>{
            tipDiv.style.overflow = `visible`
             tipDiv.style.maxHeight=`999px`;
           }, 600)
          }
          else{

            tipDiv.style.overflow = `hidden`
            tipDiv.style.transition=`max-height 0s ease`;
            tipDiv.style.maxHeight=`${tipDiv.scrollHeight}px`;
            setTimeout(()=>{
              tipDiv.style.transition=`max-height 0.6s ease`;
              tipDiv.style.maxHeight=`0`;
             }, 1)
             setTipInputValue("");
             setSelectedField();
            setTip(0);

          }
        },[tipShow])

    
      


    return <div className={styles.tipMainDiv}>


<div className={styles.tipShowCheckboxDiv}  onClick={()=>{ setTipShow(!tipShow)}}>
      <div  className={styles.tipShowChecker}>
        {tipShow && <Image src='/images/correct.svg' height={10} width={10}/>}
      </div>
     
  
      <span className={styles.tipShowCheckboxLabel}>
     Show your support for the GameBuff team
    </span>

   
    </div>
      
      <div id='tipDiv' className={styles.tipDiv}>
        <div className={styles.roundPercentWrapper}>
            <div className={`${styles.roundPercent}`} 
            onClick={()=>{
              setTipError(); setTipInputValue(""); setApplyDisabled(true); setSelectedField(5); setTip((fullProductCost*5/100).toFixed(2));}}>
            <span className={styles.roundPercentSpan}>5%</span>
            <span className={styles.roundTipSpan}>${(fullProductCost*5/100).toFixed(2)}</span>
            {
              selectedField==5 &&
              <div className={styles.selectedPercent}/>
            }
            </div>
            <div className={`${styles.roundPercent}`}
             onClick={()=>{setTipError();setTipInputValue(""); setApplyDisabled(true); setSelectedField(10); setTip((fullProductCost*10/100).toFixed(2));}}>
            <span className={styles.roundPercentSpan}>10%</span>
            <span className={styles.roundTipSpan}>${(fullProductCost*10/100).toFixed(2)}</span>
            {
              selectedField==10 &&
              <div className={styles.selectedPercent}/>
            }
            </div>
            <div className={`${styles.roundPercent}`} 
            onClick={()=>{setTipError();setTipInputValue(""); setApplyDisabled(true); setSelectedField(15); setTip((fullProductCost*15/100).toFixed(2));}}>
            <span className={styles.roundPercentSpan}>15%</span>
            <span className={styles.roundTipSpan}>${(fullProductCost*15/100).toFixed(2)}</span>
            {
              selectedField==15 &&
              <div className={styles.selectedPercent}/>
            }
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
            if(tipValue==="" ){
              if(tip==0)setApplyDisabled(true);
              else setApplyDisabled(false);
                setTipInputValue(tipValue);
                return;
            }    
            if(hasOnlyOneDot && areAllOtherCharsDigits){
              if(tip==parseFloat(tipValue.slice(0, -1)))setApplyDisabled(true);
              else setApplyDisabled(false);
              setTipInputValue(tipValue);
              return;
            }        
            setTipError();
            const floatValue = parseFloat(tipValue);
            if(isNaN(floatValue) || /^-?\d*\.\d{3,}$/.test(tipValue))return;
            if(floatValue!=tip)setApplyDisabled(false);
            else setApplyDisabled(true);
        
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
        <span className={`${styles.addTip} ${applyDisabled && styles.addTipDisabled}`}
        onClick={()=>{
          if(parseFloat(tipInputValue, 2) > fullProductCost) {setTipInputValue(""); setTipError(true); return;}
            setSelectedField(0);
            setApplyDisabled(true);
            if(tipInputValue=="")setTip(0);
            else setTip(parseFloat(tipInputValue).toFixed(2));
        }}    >{tip==0?"Add tip":"Update tip"}</span>
      


        </div>
        {tipError && <span className={styles.tipError}>Enter a tip less than ${fullProductCost}</span>}
            <span className={styles.thankYouMessage}>Thank you for supporting us.</span>

    </div>
     </div>
}

// <div className={styles.tipCheckerBorderSupport}/>