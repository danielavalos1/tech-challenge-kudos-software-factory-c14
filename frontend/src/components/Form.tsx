import { twMerge } from "tailwind-merge";
import React from "react";
import { Button } from "./Button";

export interface FormProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export const Form = ({ children, onSubmit, className }: FormProps) => {
  const classes = twMerge(`space-y-6`, className);

  return (
    <form className={classes} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export interface InputFormProps {
  label: string;
  id: string;
  name: string;
  type?: "text" | "password" | "email" | "number";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  );
};

export interface ButtonFormProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonForm: React.FC<ButtonFormProps> = ({
  children,
  className,
}) => {
  return (
    <Button type="submit" className={className}>
      {children}
    </Button>
  );
};

export interface SelectFormProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export interface Option {
  value: string;
  label: string;
}

export const SelectForm: React.FC<SelectFormProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="mt-1">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer"
        >
          {options.map((option) => (
            <option
              className="cursor-pointer"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Form.Button = ButtonForm;
Form.Input = InputForm;
Form.Select = SelectForm;

export default Form;
