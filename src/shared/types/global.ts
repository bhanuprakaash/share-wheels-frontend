export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface ErrorResponse {
    message: string;
    data?: unknown;
    success: boolean;
}
