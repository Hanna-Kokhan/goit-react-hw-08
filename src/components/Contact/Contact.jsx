import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { FaUser, FaPhone } from "react-icons/fa";
import styles from "./Contact.module.css";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteContact(contact.id)).unwrap();
      toast.success(`Contact ${contact.name} deleted.`);
    } catch (error) {
      toast.error("Failed to delete contact.");
      console.error("Error deleting contact:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.contact}>
      <div className={styles.info}>
        <span className={styles.name}>
          <FaUser />
          {contact.name}
        </span>
        <span className={styles.number}>
          <FaPhone />
          {contact.number}
        </span>
      </div>
      <button
        className={styles.deleteBtn}
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default Contact;
