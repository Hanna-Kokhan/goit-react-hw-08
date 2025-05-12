import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleAndForm}>
        <h1>Log In</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
