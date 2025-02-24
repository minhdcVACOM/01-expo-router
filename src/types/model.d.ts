import { APP_COLOR } from "@/utils/constant";
import Toast from "react-native-root-toast";

export { };
declare global {
    interface IBackendRes<T> {
        error?: IError;
        message: string;
        statusCode: number | string;
        data?: T;
    }
    interface IError {
        code: string;
        details: string;
        message: string;
        validationErrors: IErrorValidation[];
    }
    interface IErrorValidation {
        members: string[];
        message: string;
    }
    interface ITenant {
        success: boolean;
        tenantId: string;
        name: string;
        isActive: boolean;
    }
    interface ISuccess {
        msg: string;
        ok: boolean;
    }
    interface ILogin {
        tenantId: string;
        tenantName: string;
        username: string;
        token: string;
        tokenType: string;
    }
}
