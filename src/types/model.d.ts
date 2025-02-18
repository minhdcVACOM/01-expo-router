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
        validationErrors: string[]
    }
    interface ITenant {
        success: boolean;
        tenantId: string;
        name: string;
        isActive: boolean;
    }
}
