import GetDataButton from "../MagicButtons/GetDataButton";
import SaveButton from "../MagicButtons/SaveButton";
import OrderCard from "./OrderCard/OrderCard";
import { useState } from "react";
import styles from "./orders.module.css";
import PageIndexButtons from "../MagicButtons/PageIndexButtons";

export default function Orders({ data, setData }) {
  const [packageStatusArray, setPackageStatusArray] = useState([]);
  const [page, setPage] = useState(0);

  const handlePackageStatusChange = (i, packageStatus) => {
    const updatedPackageStatusArray = [];
    packageStatusArray.map((ps, id) => {
      if (id === i) updatedPackageStatusArray.push(packageStatus);
      else updatedPackageStatusArray.push(ps);
    });

    setPackageStatusArray(updatedPackageStatusArray);
  };

  const clearAfterDataSave = () => {
    setPackageStatusArray([]);
    setPage(0);
  };

  const initializePackageStatusData = (data) => {
    let newpackageStatusArray = [];
    for (let i = 0; i < data.length; i++) {
      newpackageStatusArray.push(data[i].packageStatus);
    }

    setPackageStatusArray(newpackageStatusArray);
  };

  if (data.length === 1 && data[0] === "No orders")
    return (
      <>
        <h1>Orders</h1>
        <GetDataButton
          name="Orders"
          dataType={"get_unfulfilled_orders"}
          setData={setData}
          initializeData={initializePackageStatusData}
        />
        <p>All orders fulfilled for now.</p>
      </>
    );

  return (
    <>
      <div className={styles.titleDiv}>
        <h1>Orders</h1>
        {data.length !== 0 ? (
          <SaveButton
            dataType="send_unfulfilled_orders"
            oldData={data}
            statusData={packageStatusArray}
            setOldData={setData}
            clearAfterDataSave={clearAfterDataSave}
          />
        ) : (
          <>
            <GetDataButton
              name="Fulfilled Orders"
              secondStyle="firstButton"
              dataType={"get_fulfilled_orders"}
              setData={setData}
              initializeData={initializePackageStatusData}
            />
            <GetDataButton
              name="Unapproved Orders"
              secondStyle="secButton"
              dataType={"get_unapproved_orders"}
              setData={setData}
              initializeData={initializePackageStatusData}
            />
          </>
        )}
      </div>
      {data.length === 0 && (
        <GetDataButton
          name="Orders"
          dataType={"get_unfulfilled_orders"}
          setData={setData}
          initializeData={initializePackageStatusData}
        />
      )}
      {data.length !== 0 && data.length >= page * 10 && (
        <>
          {data
            .slice(
              page * 10,
              (page + 1) * 10 > data.length - 1
                ? data.length 
                : (page + 1) * 10,
            )
            .map((order, index) => (
              <OrderCard
                key={page * 10 + index}
                id={page * 10 + index}
                info={`${order.id}, ${order.email}, ${order.firstName}, ${order.lastName}, ${order.address}, ${order.apt}, ${order.country}, ${order.zipcode}, ${order.state}, ${order.city}, ${order.phone}, ${order.discount}`}
                items={`${order.items}`}
                packageStatus={packageStatusArray[index + page * 10]}
                handlePackageStatusChange={handlePackageStatusChange}
              />
            ))}
        </>
      )}

      <PageIndexButtons data={data} page={page} setPage={setPage} />
    </>
  );
}
