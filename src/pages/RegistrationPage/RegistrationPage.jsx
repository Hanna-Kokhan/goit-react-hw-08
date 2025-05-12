import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleAndForm}>
        <h1>Registration</h1>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
