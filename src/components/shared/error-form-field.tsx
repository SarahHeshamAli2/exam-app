import { FieldError } from "react-hook-form";

type errorFormFieldProps = {
  error: FieldError | undefined;
};

export default function ErrorFormField({ error }: errorFormFieldProps) {
  return (
    <>
      <span className="text-sm text-red-600 block min-h-1">
        {error?.message}
      </span>
    </>
  );
}
