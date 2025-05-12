import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectContactsLoading } from "../../redux/contacts/selectors";
import styles from "./ContactForm.module.css";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be no more than 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsLoading);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addContact(values)).unwrap();
      resetForm();
      toast.success(`Contact ${values.name} added.`);
    } catch (error) {
      toast.error("Failed to add contact.");
      console.error("Error adding contact:", error);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Field type="text" id="name" name="name" className={styles.input} />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="number" className={styles.label}>
            Number
          </label>
          <Field
            type="tel"
            id="number"
            name="number"
            className={styles.input}
          />
          <ErrorMessage
            name="number"
            component="div"
            className={styles.error}
          />
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add contact"}
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
