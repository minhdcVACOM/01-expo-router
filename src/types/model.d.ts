import Toast from react - native - root - toast;

export { };
declare global {
    interface IDvcs {
        id: string,
        code: string;
        name: string;
        address: string;
        taxCode: string;
    }
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
    interface IWindowPram {
        windowId: string,
        menuId: string,
        quickSearch?: string,
        start: number,
        count: number,
        continue: boolean,
        filterRows?: any[],
        filterAdvanced?: any,
        tlbparam?: any[]
    }
    interface IMenuWindow {
        title: string,
        menuId: string,
        windowId: string,
        fieldSearch?: string,
        quickSearch?: string,
        marginBottom?: number,
        status?: { fieldName: string, fieldType: string, refId: string }
    }
    interface IPermissionsWindow {
        mnCopy?: string,
        mnDelete?: string,
        mnEdit?: string,
        mnPlus?: string,
        mnRefresh?: string
    }
    interface IVoucherTemplate {
        id: string,
        code: string,
        name: string
    }
}
