import { User } from "next-auth";
import { forgotPasswordSchema, verifyOtpSchema } from "../schemes/auth.schema";

export type LoginFields = z.infer<typeof loginSchema>;

export type RegisterFields = zod.infer<typeof registerSchema>;
export type ForgotPasswordFields = zod.infer<typeof forgotPasswordSchema>;
export type VerifyOtpField = zod.infer<typeof verifyOtpSchema>;
export type ResetPasswordFields = zod.infer<typeof resetPasswordSchema>;
export type ChangePasswordFields = zod.infer<typeof changePasswordSchema>;
export type UpdateProfileFields = zod.infer<typeof updateProfileSchema>;
export type LoginResponse = {
  token: string;
  user: User["user"];
};
export type RegisterResponse = {
  token: string;
  user: User["user"];
};

export type forgotPasswordResponse = {
  info: string;
  message: string;
};

export type otpVerifyResponse = {
  status: string;
};

export type resetPasswordResponse = {
  message: string;
  token: string;
};

export type ChangePasswordResponse = {
  message: string;
  token: string;
};
