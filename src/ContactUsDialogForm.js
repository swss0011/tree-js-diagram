import * as React from "react";
import { Field, ErrorMessage } from "formik";

import styles from './ContactUsDialogForm.module.css'

console.log(styles)

export default function({ node }) {
  return (
    <div className={styles.dialog}>
      <h3>צור קשר {node && node.name ? <>אודות {node.name}</> : null}</h3>

      <Field type="email" name="email" placeholder="מייל" />
      <ErrorMessage name="email" component="div" />

      <Field type="text" name="name" placeholder="שם מלא" />
      <ErrorMessage name="name" component="div" />

      <Field
        type="text"
        name="message"
        component="textarea"
        rows={10}
        cols={30}
        placeholder="תוכן ההודעה"
      />
      <ErrorMessage name="message" component="div" />

      <div>
        <button type="submit">שלח</button>
      </div>
    </div>
  );
}
