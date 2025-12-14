"use server";

import { API_BASE_URL } from "../constants/base-url.constant";
import {
  ChangePasswordFields,
  ChangePasswordResponse,
  ForgotPasswordFields,
  forgotPasswordResponse,
  otpVerifyResponse,
  RegisterFields,
  RegisterResponse,
  ResetPasswordFields,
  resetPasswordResponse,
  UpdateProfileFields,
  VerifyOtpField,
} from "../types/auth.types";
import getToken from "../utils/manage-token";
import { LoginFields, LoginResponse } from "@/lib/types/auth.types";

export async function registerService(
  data: RegisterFields
): Promise<ApiResponse<RegisterResponse>> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function loginService(fields: LoginFields) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify({
        email: fields?.email,
        password: fields?.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const payload: ApiResponse<LoginResponse> = await response.json();

  return payload;
}

export async function forgetPasswordService(
  data: ForgotPasswordFields
): Promise<ApiResponse<forgotPasswordResponse>> {
  const response = await fetch(`${API_BASE_URL}/auth/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function verifyOtpService(
  data: VerifyOtpField
): Promise<ApiResponse<otpVerifyResponse>> {
  const response = await fetch(`${API_BASE_URL}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function resetPasswordService(
  data: ResetPasswordFields
): Promise<ApiResponse<resetPasswordResponse>> {
  const response = await fetch(`${API_BASE_URL}/auth/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function updateUserProfileService(
  data: UpdateProfileFields
): Promise<ApiResponse<resetPasswordResponse>> {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/auth/editProfile`, {
    method: "PUT",
    headers: {
      token: token!.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function changePasswordService(
  data: ChangePasswordFields
): Promise<ApiResponse<ChangePasswordResponse>> {
  const token = await getToken();

  const response = await fetch(`${API_BASE_URL}/auth/changePassword`, {
    method: "PATCH",
    headers: {
      token: token!.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
export async function getProfileInfoService(): Promise<
  ApiResponse<ChangePasswordResponse>
> {
  const token = await getToken();

  const response = await fetch(`${API_BASE_URL}/auth/profileData`, {
    method: "GET",
    headers: {
      token: token!.accessToken,
    },
  });

  return response.json();
}
