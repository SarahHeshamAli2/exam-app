"use client";
import { useState } from "react";

export function usePasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    toggleVisibility,
    inputType: showPassword ? "text" : "password",
  };
}
