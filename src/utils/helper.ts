import Toast from "react-native-root-toast";
import { APP_COLOR } from "./constant";

export const Helper = {
    getError: (error: any) => {
        let e = error;
        if (error.response) {
            e = error.response.data;                   // data, status, headers
            if (error.response.data && error.response.data.error) {
                e = error.response.data.error;           // my app specific keys override
            }
        } else if (error.message) {
            e = { message: error.message };;
        } else {
            e = { message: "Unknown error occured" };
        }
        return e;
    },
    toastShow: (msg: string, error?: boolean) => {
        Toast.show(msg, {
            backgroundColor: (error ? APP_COLOR.BG_DARKRED : APP_COLOR.PRIMARY1),
            position: Toast.positions.TOP
        });
    },
    showError: (error: IError) => {
        let _msg = "";
        if (error.validationErrors) {
            error.validationErrors.forEach((_e) => {
                _msg += _e.message + "\n";
            })
        } else {
            _msg = error.message;
        }
        Helper.toastShow(_msg, true);
    }
};
