import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { selectContactsLoading } from "../../redux/contactsSlice";
import styles from "./ContactForm.module.css";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactForm() {
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
        <label className={styles.label}>
          Name
          <Field name="name" />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </label>

        <label className={styles.label}>
          Number
          <Field name="number" />
          <ErrorMessage
            name="number"
            component="div"
            className={styles.error}
          />
        </label>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add contact"}
        </button>
      </Form>
    </Formik>
  );
}
