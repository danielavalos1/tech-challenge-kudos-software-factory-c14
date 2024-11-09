import React, { useState } from "react";
import { login } from "../services/auth";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await login(formData.email, formData.password);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen bg-neutral-900 flex flex-col justify-center items-center">
      <h1 className="text-3xl">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-96 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border border-neutral-500"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-neutral-500"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button className="bg-primary-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};
