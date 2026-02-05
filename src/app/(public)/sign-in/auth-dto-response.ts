export interface AuthDtoResponse {
    data: {
        token: string;
        sub: string;
        email: string;
        name: string;
    } | null;
    message: string;
    success: boolean;
    statusCode: number;
    trace: string | null;
    error: string | null;
}