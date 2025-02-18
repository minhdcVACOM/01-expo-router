import vcAxios from "@/utils/vcaxios";

export const apiGetTenant = () => {
    const url = "/api/abp/multi-tenancy/tenants/by-name/VP";
    return vcAxios.get<ITenant>(url);
}