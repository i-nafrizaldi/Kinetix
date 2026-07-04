import React, { HTMLInputTypeAttribute } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormikErrors, FormikHandlers } from "formik";

interface FormInputProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  value: string | number | Date;
  isError: boolean;
  label: string;
  error: string | FormikErrors<Date> | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  placeholder,
  error,
  isError,
  label,
  onBlur,
  onChange,
  type,
  value,
}) => {
  return (
    <div>
      <Label htmlFor={placeholder} className={isError ? "text-red-500" : ""}>
        {label}
      </Label>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={
          typeof value === "string" || typeof value === "number"
            ? value
            : value.toISOString()
        }
        className="rounded-md border"
      />
      {isError ? (
        <div>{typeof error === "string" ? error : JSON.stringify(error)}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
