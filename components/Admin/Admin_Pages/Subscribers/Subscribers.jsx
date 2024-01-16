import GetDataButton from "../MagicButtons/GetDataButton";
import styles from "./subscribers.module.css";
import { useState } from "react";

export default function Subscribers({ subscribers, setSubscribers }) {
  const initializeSubscribersData = (data) => {
    if (data && data.length == 0) setSubscribers("No Subscribers");
    let newSubscribersArray = "";
    for (let i = 0; i < data.length; i++) {
      newSubscribersArray = newSubscribersArray +  " " + data[i].email + "\n";
    }

    setSubscribers(newSubscribersArray);
  };

  if (subscribers && subscribers[0] === "No Subscribers")
    return (
      <>
        <h1>Subscribers</h1>
        <GetDataButton
          name="Subscribers"
          dataType={"get_subscribers"}
          setData={() => {}}
          initializeData={initializeSubscribersData}
        />
        <p>Noone subscribed yet bro :/</p>
      </>
    );

    const getSmallList=(list,jmin, jmax)=>{
      let smallList=[];
      for(let j=jmin; j<jmax; j++){
        smallList.push(<p key={j} className={styles.emailP}>{list[j]}</p>);
      }
      return <>{smallList.map((item)=>{return item})}</>
        
    }

  const renderEmailList = () => {

    if (subscribers.length === 0)
    return (
      <GetDataButton
        name="Subscribers"
        dataType={"get_subscribers"}
        setData={() => {}}
        initializeData={initializeSubscribersData}
      />
    );
   

    const list = subscribers
      .split("\n");
    const listLength = list.length;
    const listOfRows=[];
    for(let i=0; i<Math.floor(listLength/5)+1; i++){
      listOfRows.push(<div className={styles.subscribersRowWrapper}>
        <h1 className={styles.identifier}>{i+1}</h1>
        <div className={styles.subscribersRow}>
        {getSmallList(list,i*5, i*5+5<listLength?i*5+5:listLength)}
        </div>
      </div>)
    }
     

    return listOfRows;
  };

  return (
    <>
      <h1>Subscribers</h1>

      <div className={styles.subscribersWrapper}>
      <div className={styles.subscribersMain}>
      {renderEmailList()}
      </div>
      </div>
    </>
  );
}
