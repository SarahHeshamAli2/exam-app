"use client";
import { Input } from "@/components/ui/input";
import { usePasswordToggle } from "../_hooks/use-toggle-password";
import { Eye, EyeOff } from "lucide-react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  register?: UseFormRegister<T>;
  isError?: boolean;
};

export default function PasswordInput<T extends FieldValues>({
  name,
  isError,
}: PasswordInputProps<T>) {
  const { showPassword, toggleVisibility, inputType } = usePasswordToggle();
  const { register } = useFormContext();
  return (
    <div className="flex relative">
      <Input
        isError={isError}
        id={name}
        placeholder="*****"
        type={inputType}
        {...register(name)}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        aria-label={showPassword ? "Hide password" : "Show password"}>
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
