import { useSelector } from "react-redux";
import {
  selectFilteredContacts,
  selectContactsLoading,
  selectContactsError,
} from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import { PulseLoader } from "react-spinners";
import styles from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <PulseLoader color="#36d7b7" size={14} />
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>❌ {error}</p>;
  }

  if (contacts.length === 0) {
    return <p className={styles.message}>No contacts found</p>;
  }

  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
