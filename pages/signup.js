import React, { useState } from "react";
import styles from "@/styles/Signup.module.css";
import { Card } from "react-bootstrap";
import { useRouter } from 'next/router';


export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
     profilePicture: "",
  });

  const router = useRouter();


  const [errors, setErrors] = useState({});

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "",
  }));
};

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file && file.type.match(/^image\//)) {
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData,  profilePicture: imageUrl });

    setErrors((prevErrors) => ({
      ...prevErrors,
       profilePicture: "",
    }));
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors,
       profilePicture: "Please upload a valid image file.",
    }));
  }
};

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.includes("@") || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      formData. profilePicture &&
      !/^blob:|https?:\/\/.*\.(jpeg|jpg|gif|png|webp)$/.test(formData. profilePicture)
    ) {
      newErrors. profilePicture =
        "Enter a valid image URL (jpeg, jpg, png, gif, webp)";
    }

    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length === 0) {
    try {
      const { confirmPassword, ...dataToSubmit } = formData;

      console.log("Sending:", dataToSubmit);


      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({ general: result.message || "Something went wrong." });
      } else {
        console.log("Success:", result);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Server error. Please try again later." });
    }
  } else {
    setErrors(validationErrors);
  }
};


  return (
    <div className= {styles.concertoneregular}>
      <h2 className= {styles.title}>Sign Up</h2>
      <Card className={styles.Card}>
        <form onSubmit={handleSubmit}>
          <div > 
            <label >Name</label> <br />
            <input
              type="text"
              name="firstName"
              className={styles.input1}
              value={formData.firstName}
              onChange={handleChange}
              placeholder="first name"
            />
            <input
              type="text"
              name="lastName"
              className={styles.input1}
              value={formData.lastName}
              onChange={handleChange}
              placeholder="last name"
            />
            {(errors.firstName || errors.lastName) && (
              <div className={styles.error1}>
                <span className={styles.error1}>{errors.firstName || ""}</span>
                <span className={styles.error1}>{errors.lastName || ""}</span>
              </div>
            )}
          </div>

          <div>
            <label className={styles.label}>Username</label> <br />
            <input
              type="text"
              name="username"
              className={styles.input}
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
            />
            {errors.username && <p className={styles.error}>{errors.username}</p>}
          </div>

          <div>
            <label className={styles.label}>Email</label> <br />
            <input
              type="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div>
            <label className={styles.label}>Password</label> <br />
            <input
              type="password"
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div>
            <label className={styles.label}>Confirm Password</label> <br />
            <input
              type="password"
              name="confirmPassword"
              className={styles.input}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="confirm password"
            />
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}

          </div>

          <div>
            <label className={styles.label}>Profile Picture</label>
            <br></br>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.imageinput}
            />
            <br></br> 
            {formData. profilePicture && (
              <img
                src={formData. profilePicture}
                alt="Preview"
                className= {styles.imagePreview}
              />
            )}
            {errors. profilePicture && (
              <p className={styles.error}>{errors. profilePicture}</p>
            )}
          </div>
          <button
            type="submit"
            className= {styles.btn}
          >
            Create Account
          </button>
        </form>
      </Card>
    </div>
  );
}

