// import type { Key, ReactNode } from "react";

export interface ApiResponse<T> {
    // booking_id: Key | null | undefined;
    // bookings_status: ReactNode;
    data: T;
    success: boolean;
    message?: string;
}

export interface ErrorResponse {
    message: string;
    data?: unknown;
    success: boolean;
}
