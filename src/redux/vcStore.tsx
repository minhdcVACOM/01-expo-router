import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
export const vcStore = configureStore({
    reducer: {
        app: appSlice
    }
});
export type VcStore = ReturnType<typeof vcStore.getState>;