import { toast } from 'react-hot-toast';
import { isAxiosError } from 'axios';

export const toastSuccess = (message: string) => {
  if (!message) return;
  toast.success(message, { duration: 3000 });
};

export const toastError = (error: unknown, fallbackMessage = 'Something went wrong') => {
  let message = fallbackMessage;

  // AxiosError
  if (isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (data && typeof data === 'object') {
      const obj = data as { message?: string; error?: string };
      message = obj.message ?? obj.error ?? error.message ?? fallbackMessage;
    } else {
      message = error.message || fallbackMessage;
    }
  } else if (error instanceof Error) {
    message = error.message || fallbackMessage;
  } else if (typeof error === 'string') {
    message = error;
  }

  toast.error(message, { duration: 4000 });
};

export const toastInfo = (message: string) => {
  if (!message) return;
  toast(message, { duration: 3000 });
};
