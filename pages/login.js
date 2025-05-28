import { useState } from "react";
import styles from "@/styles/Login.module.css";
import { Card } from "react-bootstrap";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email address is invalid";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Login failed");
      }
    } else {
      console.log("Login successful:", data);
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      profilePicture: data.profilePicture,
      role: data.role,
    }));

    window.location.href = "/";

    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <>
    <div className={styles.concertoneregular}>
      <h2 className={styles.title}>Login</h2>
      <Card className={styles.Card}>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Email</label> <br />
            <input
              type="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder="email" />
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
              placeholder="password" />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <br></br>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-black py-2 rounded-xl hover:bg-blue-700 transition ${styles.btn}`}
          >
            Login
          </button>
        </form>
      </Card>
    </div>
    <br></br>
    <br></br>
    </>
  );
}
