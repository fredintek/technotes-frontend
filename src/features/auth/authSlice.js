import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    initialState: {
        token: null,
    },
    name: "auth",
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.accessToken
        },

        logOut: (state, action) => {
            state.token = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export const selectUserToken = (state) => state.auth.token

export default authSlice.reducer