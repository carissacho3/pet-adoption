import React from "react";
import styles from "@/styles/Contact.module.css";
import { Card } from "react-bootstrap";
import { useRef } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hbobek8",
        "template_uhnwyaz",
        form.current,
        "NfXSci4NNFC4fLHkq"
      )
      .then(
        (result) => {
          alert("Email sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send email: " + error.text);
        }
      );
  };

  return (
   
      <>
      <h1 className={styles.title}>{"Let's Chat"}</h1><Card className={styles.stylecard}>
          <div className={styles.contact}>
              <form ref={form} onSubmit={sendEmail} className={styles.form}>
                  <span>Name:</span>
                  <input
                      className={styles.input}
                      type="text"
                      name="name"
                      placeholder="Name"
                      required />

                  <span>Email:</span>
                  <input
                      className={styles.input}
                      type="email"
                      name="email"
                      placeholder="Email"
                      required />

                  <span>Message:</span>
                  <textarea
                      className={styles.textarea}
                      name="message"
                      placeholder="Message"
                      required />
<button
          
            className={`w-full bg-blue-600 text-black py-2 rounded-xl hover:bg-blue-700 transition ${styles.btn}`}
          >
            Login
          </button>
              </form>
          </div>
      </Card>
      </>
    
  );
};

export default Contact;
