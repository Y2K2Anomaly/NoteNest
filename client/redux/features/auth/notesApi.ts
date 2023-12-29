import { apiSlice } from "../api/apiSlice";

interface INote {
    id: string
    title: string;
    description: string;
}

export const notesApi: any = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        // endpoints here
        getnotes: builder.query({
            query: (data: any) => ({
                url: "/notes",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        createNote: builder.mutation({
            query: ({ title, description }: any) => ({
                url: "/add-new-note",
                method: "POST",
                body: {
                    title,
                    description
                },
                credentials: "include" as const
            }),
        }),
        deleteNote: builder.mutation({
            query: (id: any) => ({
                url: `/delete-note/${id}`,
                method: "DELETE",
                credentials: "include" as const
            }),
        }),
        updateNote: builder.mutation({
            query: ({ id, description, title }: INote) => ({
                url: `/update-note/${id}`,
                method: "PUT",
                body: {
                    title,
                    description
                },
                credentials: "include" as const
            }),
        }),
    }),
});

export const { useGetnotesQuery, useCreateNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } = notesApi;