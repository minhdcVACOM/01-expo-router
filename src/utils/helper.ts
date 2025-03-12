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
    },
    dateToString(date: Date | null, format?: "dd/MM/yyyy" | "dd-MM-yyyy" | "yyyy-MM-dd") {
        if (!date) return null;
        var d = date.getDate();
        var m = date.getMonth() + 1; //January is 0!
        var sDate, dd = d + "", mm = m + "";
        var yyyy = date.getFullYear();
        if (d < 10) {
            dd = '0' + d;
        }
        if (m < 10) {
            mm = '0' + m;
        }
        switch (format) {
            case "dd/MM/yyyy":
                sDate = dd + "/" + mm + "/" + yyyy;
                break;
            case "yyyy-MM-dd":
                sDate = yyyy + "-" + mm + "-" + dd;
                break;
            case "dd-MM-yyyy":
                sDate = dd + "-" + mm + "-" + yyyy;
                break;
            default:
                sDate = dd + "/" + mm + "/" + yyyy;
                break;
        }
        return sDate;
    },
    formatDate(strDate: string, format?: "dd/MM/yyyy" | "dd-MM-yyyy" | "yyyy-MM-dd") {
        if (!strDate) return null;
        var strSplitDate = String(strDate).split(' ');
        var date: any = new Date(strSplitDate[0]);
        // alert(date);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        switch (format) {
            case "dd/MM/yyyy":
                date = dd + "/" + mm + "/" + yyyy;
                break;
            case "yyyy-MM-dd":
                date = yyyy + "-" + mm + "-" + dd;
                break;
            case "dd-MM-yyyy":
                date = dd + "-" + mm + "-" + yyyy;
                break;
            default:
                date = dd + "/" + mm + "/" + yyyy;
                break;
        }
        return date.toString();
    },
    formatNumber(input: any, decimalSeparator = ".", thousandSeparator = " ", decimalPlaces = 2) {
        if (typeof input === "number") {
            if (input === 0) return null;
            input = input.toString();
        }
        // Loại bỏ tất cả ký tự không hợp lệ trừ số và dấu thập phân `.`
        let rawValue = input.replace(/[^0-9.]/g, "");

        // Đảm bảo chỉ có 1 dấu `.`
        const countDecimals = (rawValue.match(/\./g) || []).length;
        if (countDecimals > 1) {
            rawValue = rawValue.replace(/\.(?=.*\.)/g, ""); // Giữ lại dấu `.` đầu tiên
        }

        const isEnd = rawValue.slice(-1) === "." && rawValue.slice(-2) !== ".";
        // Chia phần nguyên và phần thập phân
        let parts = rawValue.split(decimalSeparator);
        let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
        let decimalPart = parts[1] ? parts[1].substring(0, decimalPlaces) : "";
        return decimalPart ? `${integerPart}${decimalSeparator}${decimalPart}` : integerPart + (isEnd ? "." : "");
    },
    currencyFormatter(
        value: any,
        options?: {
            significantDigits: number,
            thousandsSeparator: string,
            decimalSeparator: string,
            symbol: string
        }) {
        const optionsInfo = (options ?? {
            significantDigits: 0,
            thousandsSeparator: '.',
            decimalSeparator: ',',
            symbol: 'đ'
        });
        if (typeof value !== 'number' || value === null) return `?${optionsInfo.symbol}`;
        value = value.toFixed(optionsInfo.significantDigits)

        const [currency, decimal] = value.split('.')
        return `${currency.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            optionsInfo.thousandsSeparator
        )}${optionsInfo.symbol}`
    }
};
