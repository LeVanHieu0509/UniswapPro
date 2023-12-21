import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type AlertType = "SUCCESSFUL" | "ERROR" | "WARNING" | "TO_DO" | null;

export const SUCCESS_API = "ok";
export const ERROR_API_MESSAGE = "Có lỗi xảy ra";
export const EMPTY_DATA = "Không có dữ liệu";

export const Alert = (type: AlertType, message: string, options?: ToastOptions) => {
  switch (type) {
    case "SUCCESSFUL": {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...options,
      });
      break;
    }
    case "ERROR": {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        toastId: message,
        autoClose: 5000,
        ...options,
      });
      break;
    }
    case "WARNING": {
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...options,
      });
      break;
    }
    case "TO_DO": {
      toast.error(message, {
        autoClose: false,
        position: toast.POSITION.TOP_RIGHT,
        ...options,
      });
      break;
    }
    default:
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        ...options,
      });
  }
};
