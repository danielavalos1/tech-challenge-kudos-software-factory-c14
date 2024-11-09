import React, { useState } from "react";
import { login } from "../services/auth";
import Form from "../components/Form";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-gray-600 dark:text-gray-400" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Sign up
            </Link>
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            required
          />
          <Form.Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            required
          />
          <Form.Button>Login</Form.Button>
        </Form>
      </div>
    </div>
  );
};
