export interface GlobalResponse<T> {
    data: T | null;
    message: string;
    success: boolean;
    statusCode: number;
    trace: string | null;
    error: string | null;
}