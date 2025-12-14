import getToken from "@/lib/utils/manage-token";

export async function DeleteAccountService() {
  const token = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/deleteMe`,
    {
      headers: {
        token: token!.accessToken,
      },
      method: "DELETE",
    }
  );
  return response;
}
