import { useRef } from "react";
import styles from "./adminlogin.module.css";

const AdminNavbar = ({ checkAdminStatus }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/adminlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      const data = await response.json();
      if (data.success) {
        checkAdminStatus();
      } else {
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.centerLogin}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin} className={styles.loginBox}>
        <input type="text" placeholder="Username" ref={usernameRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminNavbar;
