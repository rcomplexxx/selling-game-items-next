import React, { useEffect, useRef } from 'react';
import styles from './toastmessage.module.css'

export default function ToastMessage({showToastMessage, setShowToastMessage}) {

    const toastTimeout=useRef();
    const toastRef= useRef();


    useEffect(()=>{

        console.log('Hello', showToastMessage)

        const toast = toastRef.current;

        if(showToastMessage==1){
        global.toastMessageShowable=true;

        toastTimeout.current= setTimeout(()=> {
           
            if(toast){
            
            toast.classList.add(styles.dissapearingToast);      
      
            setTimeout(()=>{
              setShowToastMessage(0);
              clearTimeout(toastTimeout.current);
            },500);
            
            
          }
          },
          4500);
        }
        else if(showToastMessage==2){

            clearTimeout(toastTimeout.current);

            setTimeout(()=>{
               
                if(toast){
                
                toast.classList.add(styles.dissapearingToast);  
                setTimeout(()=>{setShowToastMessage(0)},300)    
                } 
              },300)
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
