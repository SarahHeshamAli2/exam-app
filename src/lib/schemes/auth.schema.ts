import zod from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const registerSchema = zod
  .object({
    username: zod
      .string()
      .min(2, "length must be at least 2 characters long")
      .max(20, "length is maximum 20 charachter"),
    firstName: zod
      .string()
      .min(2, "length must be at least 2 characters long")
      .max(20, "length is maximum 20 charachter"),
    lastName: zod
      .string()
      .min(2, "length must be at least 2 characters long")
      .max(20, "length is maximum 20 charachter"),
    email: zod.email("please enter a valid email"),
    phone: zod
      .string()
      .min(1, "please enter a phone number")
      .refine((value) => {
        // Accept international format (+20...) or Egyptian format (01...)
        if (value.startsWith("+20")) {
          return isValidPhoneNumber(value);
        }
        // For Egyptian format, validate against backend regex
        return /^01[0125][0-9]{8}$/.test(value);
      }, "please enter a valid Egyptian phone number (01[0125]XXXXXXXX)")
      .transform((value) => {
        // Convert international format to Egyptian format
        if (value.startsWith("+20")) {
          return 0 + value.slice(3);
        }
        // Return as-is if already in Egyptian format
        return value;
      })
      .refine((value) => /^01[0125][0-9]{8}$/.test(value), {
        message: "Phone number must match pattern: 01[0125]XXXXXXXX",
      }),
    password: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    rePassword: zod.string().min(1, "please confirm your password"),
  })

  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export const loginSchema = zod.object({
  email: zod.email({
    error: (issue) => (issue.input ? "Invalid email" : "Email is required"),
  }),
  password: zod.string().min(6, "please enter a valid password"),
});

export const forgotPasswordSchema = loginSchema.pick({
  email: true,
});
export const verifyOtpSchema = zod.object({
  resetCode: zod.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const updateProfileSchema = registerSchema.omit({
  password: true,
  rePassword: true,
});

export const resetPasswordSchema = zod
  .object({
    newPassword: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    confirmNewPassword: zod.string().min(1, "please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });
export const changePasswordSchema = zod
  .object({
    oldPassword: zod.string().min(6, "please enter a valid password"),
    password: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      ),
    rePassword: zod.string().min(1, "please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });
