import styles from "./getdatabutton.module.css";

export default function GetDataButton({
  name,
  secondStyle = undefined,
  reqData = undefined,
  dataType,
  setData,
  initializeData,
}) {
  const handleGetData = async () => {
    try {
      const response = await fetch("/api/admincheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          reqData ? { dataType, data: reqData } : { dataType },
        ),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Maine DATA!", data);
        setData(data.data);
        initializeData(data.data);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error,
      );
    }
  };
  // 'get_fulfilled_orders' 'get_answered_messages'

  return (
    <button
      className={
         `${styles.magicButton} ${secondStyle &&
        (secondStyle === "firstButton"
          ? styles.secondStyle
          : styles.secondStyleSecButton)}`
      }
      onClick={handleGetData}
    >
      Get {name}
    </button>
  );
}
