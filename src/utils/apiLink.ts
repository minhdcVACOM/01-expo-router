export const API_LINK = {
    WINDOW: {
        PARAM: {
            windowId: null,
            menuId: null,
            quickSearch: "",
            start: 0,
            count: 20,
            continue: null,
            filterRows: [],
            filterAdvanced: null,
            tlbparam: []
        },
        POST: "/api/app/data-object",
        POST_GET: "/api/app/data-object/pages",
        GET: "/api/app/data-object/by-id/",
        PUT: "/api/app/data-object/",
        DELETE: "/api/app/data-object/",
        GET_CONFIG: "/api/app/window/config-by-menu-id/",
        PRINT: "/api/app/print-template"
    },
    SETTING: {
        CURRENT_ROLE: "/api/app/user/current-role",
        CURRENT_INFO: "/api/app/user/current-info",
        SAVE_CURRENT_INFO: "/api/app/user/save-current-info",
        CHANGE_PASSWORD: "/api/account/my-profile/change-password",
        USER_LOGO_UPLOAD: "/api/app/user/upload-pic",
        USER_LOGO_DELETE: "/api/app/user/current-pic-delete",
    },
    REF: {
        USER: "/api/app/user/data-reference",
        DEPARTMENT: "/api/app/data-object/data-reference?name=Departments&orderby=code&refid=646f28a7163b075e01b935c3&fieldsW=tenantId,orgId",
        POSITIONS: "/api/app/data-object/data-reference?name=Positions&orderby=code&refid=646f2bdb163b075e01b935c9&fieldsW=tenantId,orgId",
        SOFTWARETYPES: "/api/app/data-object/data-reference?name=SoftwareTypes&orderby=code&refid=64d5cdecbc2470bc11c2e530",
        REFERENCE: "/api/app/reference/values/"
    }
}