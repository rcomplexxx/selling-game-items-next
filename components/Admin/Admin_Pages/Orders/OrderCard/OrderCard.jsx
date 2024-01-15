import styles from "./ordercard.module.css";
import { useMemo, useState } from "react";

export default function OrderCard({
  id,
  info,
  packageStatus,
  handlePackageStatusChange,
  products
}) {

  const [paymentIdCovered, setPaymentIdCovered] = useState(true);
  const infoObj = useMemo(() => JSON.parse(info), [info]);


  const changePs = () => {
    packageStatus === "0"
      ? handlePackageStatusChange(id, "1")
      : packageStatus === "1"
      ? handlePackageStatusChange(id, "2")
      : handlePackageStatusChange(id, "0");
  };

  return (
    <div className={styles.cardMainDiv}>
      <div className={styles.cardRow}>
      <h1 className={styles.identifier}>{id + 1}</h1>
    

      <p className={styles.orderId}>Order_id {infoObj.id}</p>

      <button className={styles.packageStatusButton} onClick={changePs}>
        {packageStatus === "0"
          ? "Not Ordered"
          : packageStatus === "1"
          ? "Ordered"
          : "Completed"}
      </button>
      </div>


      <div className={styles.cardRow}>
        <h1 className={styles.rowTitle}>Basic info</h1>
      <div className={styles.infoRowDiv}>
      <div className={styles.infoPair}>
         <p>Email</p>
         <p>{infoObj.email}</p>
      </div>
      <div className={styles.infoPair}>
         <p>First name</p>
         <p>{infoObj.firstName}</p>
      </div>

      <div className={styles.infoPair}>
         <p>Last name</p>
         <p>{infoObj.lastName}</p>
      </div>

      <div className={styles.infoPair}>
         <p>Phone</p>
         <p>{infoObj.phone}</p>
      </div>

      </div>
      </div>
      <div  className={styles.cardRow}>
      <h1 className={styles.rowTitle}>Address</h1>
      <div className={styles.infoRowDiv}>


      <div className={styles.infoPair}>
         <p>Address</p>
         <p>{infoObj.address}</p>
      </div>

      <div className={styles.infoPair}>
         <p>Apt</p>
         <p>{infoObj.apt?infoObj.apt:'______'}</p>
      </div>

      <div className={styles.infoPair}>
         <p>Country</p>
         <p>{infoObj.country}</p>
      </div>

      <div className={styles.infoPair}>
         <p>State</p>
         <p>{infoObj.state}</p>
      </div>

      <div className={styles.infoPair}>
         <p>City</p>
         <p>{infoObj.city}</p>
      </div>

      <div className={styles.infoPair}>
         <p>Zip code</p>
         <p>{infoObj.zipcode}</p>
      </div>

   

      </div>
      </div>

      <div className={styles.cardRow}>
      <h1 className={`${styles.rowTitle} ${styles.itemsRow}`}>Items</h1>
      <div className={`${styles.infoRowDiv} ${styles.itemsMiniRow}`}>
      {JSON.parse(infoObj.items)?.map((item, index)=>{
        return <div className={`${styles.cardRow} ${styles.itemInfoRow} ${styles.cardRowNoBorder}`}>
        <p className={styles.itemNumber}>Item {index+1 + ' →'}  </p>

        <div className={styles.infoPair}>
         <p>Name</p>
         <p>{products.find(product=>{return item.id==product.id}).name}</p>
      </div>

      <div className={styles.infoPair}>
         <p>Quantity</p>
         <p>{item.quantity}</p>
      </div>

      <div className={styles.infoPair}>
         <p>Variant</p>
         <p>{item.variant}</p>
      </div>
 
   </div>
      })
     

  }
  </div>
   </div>
   <div className={`${styles.cardRow} ${styles.cardRowNoBorder}`}>
      <h1 className={styles.rowTitle}>Transaction</h1>
     <div className={styles.infoRowDiv}>
      
     <div className={styles.infoPair}>
         <p>Payment method</p>
         <p>{infoObj.paymentMethod}</p>
      </div>

      <div className={styles.infoPair}>
         <p>Payment id</p>
         <p onClick={()=>{setPaymentIdCovered(false)}} className={paymentIdCovered && styles.paymentIdCovered}>{paymentIdCovered?'Click to see':infoObj.paymentId}</p>
      </div>


    
      
      </div>
      </div>
      </div>


  );
}
