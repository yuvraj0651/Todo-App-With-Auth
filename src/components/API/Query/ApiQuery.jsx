import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiQuery = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        fetchTodos: builder.query({
            query: () => "todos",
            providesTags: ["Todos"],
        }),
        addTodos: builder.mutation({
            query: (newTodo) => ({
                url: "todos",
                method: "POST",
                body: newTodo,
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodos: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos"],
        }),
        updateTodos: builder.mutation({
            query: ({ id, ...newData }) => ({
                url: `todos/${id}`,
                method: "PATCH",
                body: newData,
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
});

export const {
    useFetchTodosQuery,
    useAddTodosMutation,
    useDeleteTodosMutation,
    useUpdateTodosMutation,
} = ApiQuery;

export default ApiQuery.reducer;