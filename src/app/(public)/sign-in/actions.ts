import { api } from "@/lib/http-client";
import { Credentials } from "./credentials.model";
import { AuthDtoResponse } from "./auth-dto-response";

export async function login(credentials: Credentials): Promise<AuthDtoResponse> {
    try {
        const response = await api<AuthDtoResponse>({
            endpoint: "/Auth/signin",
            method: "POST",
            body: credentials
        });

        return response;
    } catch (error) {
        return {
            data: null,
            message: "Erro ao efetuar login",
            success: false,
            statusCode: 500,
            trace: null,
            error: "Erro ao efetuar login. Verifique suas credenciais e tente novamente."
        }
    }
}