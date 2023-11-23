import GetDataButton from "../MagicButtons/GetDataButton";
import styles from "./subscribers.module.css";
import { useState } from "react";

export default function Subscribers({ subscribers, setSubscribers }) {
  const initializeSubscribersData = (data) => {
    if (data && data.length == 0) setSubscribers("No Subscribers");
    let newMsgStatusArray = "";
    for (let i = 0; i < data.length; i++) {
      newMsgStatusArray = newMsgStatusArray + i + " " + data[i].email + "\n";
    }

    setSubscribers(newMsgStatusArray);
  };

  if (subscribers && subscribers[0] === "No Subscribers")
    return (
      <>
        <h1>Inbox</h1>
        <GetDataButton
          name="Subscribers"
          dataType={"get_subscribers"}
          setData={() => {}}
          initializeData={initializeSubscribersData}
        />
        <p>Noone subscribed yet bro :/</p>
      </>
    );

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
      .split("\n")
      .map((str, index) => <p key={index}>{str}</p>);

    return <div className={styles.listDiv}>{list}</div>;
  };

  return (
    <>
      <h1>Subscribers</h1>
      {renderEmailList()}
    </>
  );
}
