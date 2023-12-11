import React, { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./fullscreenzoomableimage.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Image from "next/image";

const FullScreenZoomableImage = ({ imageIndex, fullScreenChange,  images }) => {
 const [zoom, setZoom]= useState(false);
 const [zoomOut,setZoomOut]=useState(false);
 const [transformOrigin, setTransformOrigin] = useState({ x: 0, y: 0 });
 const [isDragging, setDragging] = useState(false);
 const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
 const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });


 function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

 const handleMouseDown = (event) => {
  setDragging(true);
  setZoomOut(true);
  console.log('ClientX:', event.clientX);
  console.log('ClientY:', event.clientY);

  const container =  document.getElementById("zoomDiv");
  const rect = event.target.getBoundingClientRect();
   

 
   const x = (event.clientX - rect.left -48); //x position within the element.
   const y = (event.clientY - rect.top + 24)  //y position within the element.
 
   setStartMousePosition({x:event.clientX,y:event.clientY})
 
   



  setStartPosition({ x: x , y: y });
};

const handleMouseMove = (event) => {
  if (isDragging) {
 
    const container =  document.getElementById("zoomDiv");
  

    
    const deltaX = event.clientX - startPosition.x;
    const deltaY = event.clientY - startPosition.y;
    console.log('Delte', startMousePosition.x - event.clientX ,  startMousePosition.y- event.clientY );
    if(Math.abs(event.clientX -  startMousePosition.x)>20 || Math.abs(event.clientY -  startMousePosition.y)>20){setZoomOut(false);}
    const originX = transformOrigin.x ;
    const originY = transformOrigin.y;
   

    // Calculate the new transform origin based on the drag
    let newPercentX = (originX-deltaX ) / container.clientWidth * 100;
    let newPercentY =  (originY-deltaY ) / container.clientHeight * 100;
    if(newPercentX<0)newPercentX=0;
    if(newPercentY<0) newPercentY=0;
    if(newPercentX>100)newPercentX=100;
    if(newPercentY>100)newPercentY=100;
    setTransformOrigin({x:newPercentX, y:newPercentY});
  }
};

const handleMouseUp = () => {
  setDragging(false);
};



  

  return (<>

    <div className={styles.full_screen_container}>


      
    
      <div className={styles.spaceController}>

      <div className={styles.closeSuiter}>
    <Image height={0} width={0}
    src='/images/cancelWhite.png'
    onClick={() => {
      fullScreenChange(imageIndex);
    }}
        className={styles.close_button}
      >
        
      </Image>
      </div>


     
       
                    
                  <div id='zoomDiv' className={styles.productImageDiv}
                  
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onClick={(event)=>{
                    if(isDragging) { setDragging(false);return;}
                  
                    const container =  document.getElementById("zoomDiv");
                    const rect = event.target.getBoundingClientRect();
                     

                   
                     const x = (event.clientX - rect.left); //x position within the element.
                     const y = (event.clientY - rect.top)  //y position within the element.
                      console.log(x, y)

                      const percentX = (x / container.clientWidth) * 100;
                       const percentY = (y / container.clientHeight) * 100;
                      
                       if(!zoom) {setTransformOrigin({x: percentX, y:percentY});
                      setZoom(!zoom);}
                      else{if(zoomOut) setZoom(!zoom)}
                  
                  }
                    
                    
                    }>
                
                    <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                      src={images[imageIndex].src}
                      alt="Zoomable"
                      className={`${styles.productImage} ${!isTouchDevice() && zoom && styles.productImageScale} ${!isTouchDevice() && isDragging && styles.grabbing}`}
                      style={!isTouchDevice() && {transformOrigin:`${transformOrigin.x}% ${transformOrigin.y}%`}}
                      draggable={false}
                    />
                  
                  </div>
                
               
           
          
         
       
        
      </div>
      
    </div>
    </>
  );
};

export default FullScreenZoomableImage;
