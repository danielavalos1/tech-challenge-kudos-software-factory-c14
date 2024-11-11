import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MyResponse } from "../types";
import { UploadForm } from "../components/home/UploadForm";
import { ListData } from "../components/home/ListData";

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<MyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token, logout } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!file) return;
    const text = await file.text();
    try {
      const response = await fetch("http://localhost:5500/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "text/csv",
        },
        body: text,
      });
      const data = await response.json();
      setResponse(data);
      if (data.message === "Invalid token") {
        logout();
      }
      if (data.message === "Access denied") {
        alert("Access denied");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading file", error);
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
      <div className="w-full  p-8 space-y-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Data Loading System
        </h1>
        {isLoading && (
          <p className="text-gray-900 dark:text-white">Loading...</p>
        )}
        {response ? (
          <ListData data={response.data} />
        ) : (
          <UploadForm handleChange={handleChange} handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};
