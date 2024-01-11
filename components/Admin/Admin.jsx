import { useState, useEffect, useRef } from "react";
import styles from "./admin.module.css";
import AdminNavbar from "./Admin_Navbar/AdminNavbar";
import { useRouter } from "next/router";
import AdminLogin from "./Admin_Login/AdminLogin";
import AdminHome from "./Admin_Pages/Admin_Home/AdminHome";
import Orders from "./Admin_Pages/Orders/Orders";
import Inbox from "./Admin_Pages/Inbox/Inbox";
import Subscribers from "./Admin_Pages/Subscribers/Subscribers";
import Reviews from "./Admin_Pages/Reviews/Reviews";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState();
  const [triggerRender, setTriggerRender] = useState(false);
  const [subscribers, setSubscribers] = useState("");

  const orders = useRef([]);
  const messages = useRef([]);
  const reviews = useRef([]);

  const setOrders = (data) => {
    let newOrders = [];
    if (data.length == 1 && data[0] == "reset_data") {
      orders.current = [];
      setTriggerRender(!triggerRender);
      return;
    }

    if (data.length == 0) {
      orders.current = ["No orders"];
      setTriggerRender(!triggerRender);
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const order = data[i];
      newOrders.push({
        id: order.id,
        email: order.email,
        firstName: order.firstName,
        lastName: order.lastName,
        address: order.address,
        country: order.country,
        zipcode: order.zipcode,
        state: order.state,
        city: order.city,
        phone: order.phone,
        items: order.items,
        discount: order.discount,
        packageStatus: order.packageStatus,
      });
    }

    orders.current = newOrders;
    setTriggerRender(!triggerRender);
  };

  const setMessages = (data) => {
    let newOrders = [];
    if (data.length == 1 && data[0] == "reset_data") {
      messages.current = [];
      setTriggerRender(!triggerRender);
      return;
    }

    if (data.length == 0) {
      messages.current = ["No Messages"];
      setTriggerRender(!triggerRender);
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const message = data[i];
      newOrders.push({
        id: message.id,
        email: message.email,
        message: message.message,
      });
    }

    messages.current = newOrders;
    setTriggerRender(!triggerRender);
  };

  const setReviews = (data) => {
    let newReviews = [];
    if (data.length == 1 && data[0] == "reset_data") {
      reviews.current = [];
      setTriggerRender(!triggerRender);
      return;
    }

    if (data.length == 0) {
      reviews.current = ["No Reviews"];
      setTriggerRender(!triggerRender);
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const review = data[i];
      console.log(review.imageName);
      newReviews.push({
        id: review.id,
        name: review.name,
        text: review.text,
        imageNames: review.imageNames,
      });
    }

    reviews.current = newReviews;
    setTriggerRender(!triggerRender);
  };

  const checkAdminStatus = async () => {
    try {
      const response = await fetch("/api/admincheck");
      const data = await response.json();
      setIsAdmin(data.successfulLogin);
    } catch (error) {
      setIsAdmin(false);
      console.error("Error checking admin status:", error);
    }
  };

  useEffect(() => {
    // Check if the user is an admin when the component mounts

    checkAdminStatus();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  if (isAdmin === undefined) return <h2>Loading...</h2>;

  if (isAdmin) {
    const router = useRouter();
    const { adminroute } = router.query;

    let content;
    if (adminroute) {
      switch (adminroute) {
        case "orders":
          content = <Orders data={orders.current} setData={setOrders} />;
          break;
        case "inbox":
          content = <Inbox data={messages.current} setData={setMessages} />;
          break;
        case "subscribers":
          content = (
            <Subscribers
              subscribers={subscribers}
              setSubscribers={setSubscribers}
            />
          );
          break;
        case "reviews":
          content = (
            <Reviews reviews={reviews.current} setReviews={setReviews} />
          );
          break;
        default:
          content = <h1>Error 404. Page does not exist.</h1>;
      }
    } else content = <AdminHome />;

    return (
      <div className={styles.adminMainDiv}>
        <AdminNavbar setIsAdmin={setIsAdmin} />
        {content}
      </div>
    );
  }

  return <AdminLogin checkAdminStatus={checkAdminStatus} />;
}
