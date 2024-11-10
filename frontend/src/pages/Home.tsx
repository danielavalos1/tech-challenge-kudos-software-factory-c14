import React, { useState } from "react";
import Form from "../components/Form";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const { token, logout } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:5500/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/csv",
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "Invalid token") {
        logout();
      }
      if (data.message === "Access denied") {
        alert("Access denied");
      }
    } catch (error) {
      console.error("Error al subir el archivo", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header>
        <nav className="bg-gray-800 dark:bg-gray-800">
          <button onClick={() => logout()} className="text-white p-3">
            Logout
          </button>
        </nav>
      </header>
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Data Loading System
        </h1>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.InputFile
              id="file"
              name="file"
              label="Upload a File"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                }
              }}
            />
            <Form.Button>Upload</Form.Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
