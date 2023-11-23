import styles from "./savebutton.module.css";

export default function SaveButton({
  dataType,
  oldData,
  statusData,
  setOldData,
  clearAfterDataSave,
}) {
  const saveData = async () => {
    let data = [];

    for (let i = 0; i < statusData.length; i++) {
      if (statusData[i] !== oldData[i].status)
        data.push({ status: statusData[i], id: oldData[i].id.toString() });
    }
    console.log(data);
    if (data.length !== 0)
      await fetch("/api/admincheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataType: dataType, data: data }),
      })
        .then((response) => {
          if (response.ok) {
            setOldData(["reset_data"]);
            clearAfterDataSave();
          }
        })

        .catch((error) => {});
  };

  return (
    <button className={styles.saveButton} onClick={saveData}>
      Save
    </button>
  );
}
