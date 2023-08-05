import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: {...credentials}
            }),
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(args, api){
                // the first parameter gets whatever argument is passed into the query-function
                //the second parameter "api" holds some methods to manipulate the state
                try {
                    await api.queryFulfilled
                    api.dispatch(logOut())
                    api.dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        refresh: builder.query({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            })
        })
    })
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshQuery } = authApiSlice