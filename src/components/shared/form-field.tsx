import { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="mt-4">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <span className="text-sm text-red-600 block">{error}</span>}
    </div>
  );
}
