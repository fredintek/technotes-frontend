import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:9000",
    credentials: "include",
    prepareHeaders: (headers, api) => {
        const token = api.getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    
    if(result?.error?.status === 403) {
        // request refresh token
        console.log("sending the refresh token")

        const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)

        console.log(refreshResult)

        if (refreshResult?.data) {
            console.log(refreshResult?.data)

            api.dispatch(setCredentials(refreshResult?.data))

            result = await baseQuery(args, api, extraOptions)
        }else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired"
            }

            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Note", "User"],
    endpoints: builder => ({})
})