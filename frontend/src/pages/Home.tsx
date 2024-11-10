import React from "react";
import Form from "../components/Form";

export const Home = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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
              onChange={(e) => console.log(e)}
            />
            <Form.Button>Upload</Form.Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
