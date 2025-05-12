import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { toast } from "react-hot-toast";
import styles from "./LoginForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(login(values)).unwrap();
      resetForm();
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            className={styles.input}
            autoComplete="email"
          />
          <ErrorMessage name="email" component="div" className={styles.error} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            className={styles.input}
            autoComplete="current-password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
        </div>
        <button type="submit" className={styles.button}>
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
