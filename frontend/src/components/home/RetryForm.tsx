import React, { useState } from "react";
import Form from "../Form";
import { MyResponse, User } from "../../types";
import { createOne } from "../../services/user";
import Table from "../Table";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface RetryFormProps {
  error: MyResponse["data"]["errors"][number];
  onRetrySuccess: () => void;
}

const RetryForm: React.FC<RetryFormProps> = ({ error, onRetrySuccess }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: error.record.name,
    email: error.record.email,
    age: error.record.age || 0,
  });

  const [formErrors, setFormErrors] = useState({
    name: error.details.name?.error || "",
    email: error.details.email?.error || "",
    age: error.details.age?.error || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({ name: "", email: "", age: "" });

    try {
      const response = await createOne(formData as User, token as string);

      if (response.message === "Access denied") {
        alert("Access denied");
        navigate("/login");
      }

      if (response.data.error) {
        setFormErrors({
          name: response.data.error.name?.error || "",
          email: response.data.error.email?.error || "",
          age: response.data.error.age?.error || "",
        });
      }

      onRetrySuccess();
      console.log("Retry successful");
    } catch (err: any) {
      // Maneja errores de validación del servidor
      if (err.response && err.response.data && err.response.data.errors) {
        const serverErrors = err.response.data.errors;
        setFormErrors({
          name: serverErrors.name?.error || "",
          email: serverErrors.email?.error || "",
          age: serverErrors.age?.error || "",
        });
      } else {
        // Maneja otros tipos de errores
        console.error("Error al intentar crear el usuario:", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Table.Row>
        <Table.Cell>{error.row}</Table.Cell>
        <Table.Cell>
          <Form.Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            id={`name-${error.row}`}
            onChange={handleChange}
            error={formErrors.name}
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            id={`email-${error.row}`}
            onChange={handleChange}
            error={formErrors.email}
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            id={`age-${error.row}`}
            onChange={handleChange}
            error={formErrors.age}
          />
        </Table.Cell>
        <Table.Cell className="justify-center">
          <Form.Button disabled={isSubmitting}>
            {isSubmitting ? "Retrying..." : "Retry"}
          </Form.Button>
        </Table.Cell>
      </Table.Row>
    </Form>
  );
};

export default RetryForm;
