import { api } from "@/lib/http-client";
import { Credentials } from "./credentials.model";
import { AuthDtoResponse } from "./auth-dto-response";

export async function login(
  credentials: Credentials,
): Promise<AuthDtoResponse> {
  try {
    return api<AuthDtoResponse>({
      endpoint: "/register/sing-in",
      method: "POST",
      body: credentials,
    });
  } catch (error) {
    console.log("> Erro no Login", error);

    throw new Error("Erro ao realizar o login");
  }
}
