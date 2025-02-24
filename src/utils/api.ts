import vcAxios from "@/utils/vcaxios";
import { Helper } from "./helper";

export const apiGetTenant = (tenant: string) => {
    const url = "/api/abp/multi-tenancy/tenants/by-name/" + encodeURIComponent(tenant);
    return vcAxios.get(url);
}
export const apiToken = (username: string, password: string, tenantId: string, client_id = "Accounting_App", scope = "Accounting", grant_type = "password") => {
    const url = "/connect/token";
    const config = {
        method: 'post',
        url: url,
        data: {
            username: username,
            password: password,
            client_id: client_id,
            scope: scope,
            grant_type: grant_type
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "__tenant": tenantId
        }
    };
    return vcAxios(config);
}
export const apiLogin = async (tenant: string, username: string, password: string, callBack?: (res: any) => void, setLoading?: (loading: boolean) => void) => {
    if (setLoading) setLoading(true);
    apiGetTenant(tenant)
        .then((res: any) => {
            if (!res.success) {
                Helper.toastShow("Không tìm thấy mã truy cập [" + tenant + "]", true);
                if (setLoading) setLoading(false);
                return;
            }
            const tenantId = res.tenantId;
            apiToken(username, password, tenantId)
                .then((res: any) => {
                    if (setLoading) setLoading(false);
                    if (res.error) {
                        Helper.toastShow("Sai tên truy cập hoặc mật khẩu!", true);
                        return;
                    }
                    const login: ILogin = { username: username, tenantId: tenantId, tenantName: res.name, token: res.access_token, tokenType: res.token_type };
                    return callBack && callBack(login);
                })
                .catch(error => {
                    if (setLoading) setLoading(false);
                    Helper.toastShow(JSON.stringify(error), true);
                });
        })
        .catch(error => {
            if (setLoading) setLoading(false);
            Helper.toastShow(JSON.stringify(error), true);
        });
}

export const apiSendOtp = async (tenantName: string, email: string, callBack?: (res: any) => void, setLoading?: (loading: boolean) => void) => {
    if (setLoading) setLoading(true);
    const url = "/api/app/user/request-otp-code";
    return vcAxios.post<IBackendRes<ISuccess>>(url, { tenantName: tenantName, email: email })
        .then((res: any) => {
            if (setLoading) setLoading(false);
            if (res.error) {
                Helper.showError(res.error);
                return;
            }
            return callBack && callBack(res);
        })
        .catch(error => {
            if (setLoading) setLoading(false);
            Helper.toastShow(JSON.stringify(error), true);
        });
}
export const apiRecoverPass = async (tenantName: string, email: string, otpCode: string, callBack?: (res: any) => void, setLoading?: (loading: boolean) => void) => {
    if (setLoading) setLoading(true);
    const url = "/api/app/user/recover-pass";
    return vcAxios.post<IBackendRes<ISuccess>>(url, { tenantName: tenantName, email: email, otpCode: otpCode })
        .then((res: any) => {
            if (setLoading) setLoading(false);
            if (res.error) {
                Helper.showError(res.error);
                return;
            }
            return callBack && callBack(res);
        })
        .catch(error => {
            if (setLoading) setLoading(false);
            Helper.toastShow(JSON.stringify(error), true);
        });
}
