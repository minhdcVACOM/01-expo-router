import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
    name: "app",
    initialState: {
        dvcs: null,
        logo: null,
        refresh: false
    },
    reducers: {
        setDvcs: (state, action) => {
            state.dvcs = action.payload;
        },
        setLogo: (state, action) => {
            if (action.payload && !action.payload.startsWith("Content"))
                state.logo = action.payload;
            else
                state.logo = null;
        },
        setRefresh: (state) => {
            state.refresh = !state.refresh;
        }
    }
});
export const { setDvcs, setLogo, setRefresh } = appSlice.actions;
export default appSlice.reducer;