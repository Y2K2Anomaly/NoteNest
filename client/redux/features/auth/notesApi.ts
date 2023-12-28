import { apiSlice } from "../api/apiSlice";

export const notesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoints here
        getnotes: builder.query({
            query: (data) => ({
                url: "/notes",
                method: "GET",
                credentials: "include" as const,
            })
        })
    }),
});

export const { useGetnotesQuery } = notesApi;