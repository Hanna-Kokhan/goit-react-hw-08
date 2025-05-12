import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your Phonebook!</h1>
      <p className={styles.description}>
        Here you can easily manage your contacts. Register or log in to start
        using all the features.
      </p>
    </div>
  );
};

export default HomePage;
