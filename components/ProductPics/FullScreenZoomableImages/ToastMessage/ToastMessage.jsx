import React, { useEffect, useRef } from 'react';
import styles from './toastmessage.module.css'

export default function ToastMessage({showToastMessage, setShowToastMessage}) {

    const toastTimeout=useRef();
    const toastRef= useRef();


    useEffect(()=>{

       
        const toast = toastRef.current;

        if(showToastMessage === 2 || showToastMessage===3){
          global.toastMessageNotShowable=true;
        }
        if(showToastMessage==1){
         global.toastMessageNotShowable=true;

        toastTimeout.current= setTimeout(()=> {
           
            if(toast){
              global.toastMessageNotShowable=true;
            toast.classList.add(styles.dissapearingToast);      
      
            setTimeout(()=>{
              setShowToastMessage(2);
              
            },500);
            
            
          }
          },
          4500);
        }




        else if(showToastMessage==2){

            clearTimeout(toastTimeout.current);
          
               
                if(toast){
                    toast.classList.add(styles.dissapearingToast); 

                 
                setTimeout(()=>{setShowToastMessage(0)},300)    
                } 
            
        }

        else if(showToastMessage==3){
            clearTimeout(toastTimeout.current);
          
              if(toast){
                toast.classList.add(styles.instantDissapearingToast);
             
              
        
        
            }
        }

    },[showToastMessage])


   

  return (
    <div ref={toastRef} className={styles.toast}>Double tap to zoom</div>
  )
}
