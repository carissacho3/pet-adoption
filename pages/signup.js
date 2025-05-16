import React, { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fname: '',
    lname: '',
    profilepic: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fname.trim()) newErrors.fname = 'First name is required';
    if (!formData.lname.trim()) newErrors.lname = 'Last name is required';

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.includes('@') || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.profilepic && !/^https?:\/\/.*\.(jpeg|jpg|gif|png|webp)$/.test(formData.profilepic)) {
      newErrors.profilepic = 'Enter a valid image URL (jpeg, jpg, png, gif, webp)';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Add logic to send data to backend or API
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            name="fname"
            className="w-full border p-2 rounded-lg"
            value={formData.fname}
            onChange={handleChange}
          />
          {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            name="lname"
            className="w-full border p-2 rounded-lg"
            value={formData.lname}
            onChange={handleChange}
          />
          {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border p-2 rounded-lg"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded-lg"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded-lg"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Picture URL</label>
          <input
            type="text"
            name="profilepic"
            className="w-full border p-2 rounded-lg"
            value={formData.profilepic}
            onChange={handleChange}
          />
          {errors.profilepic && <p className="text-red-500 text-sm">{errors.profilepic}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
