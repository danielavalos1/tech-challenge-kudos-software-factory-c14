import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Form from "../components/Form";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(
        formData.email,
        formData.password,
        formData.name,
        parseInt(formData.age),
        formData.role
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-gray-600 dark:text-gray-400" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Sign in
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
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            label="Full name"
            required
          />
          <Form.Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            label="Age (optional)"
          />
          <Form.Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            label="Role"
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
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
          <Form.Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            label="Confirm password"
            required
          />
          <Form.Button>Create account</Form.Button>
        </Form>
      </div>
    </div>
  );
};
