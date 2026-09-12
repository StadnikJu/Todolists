import { BaseResponse } from "@/common/types";
import { Todolist } from "./todolistsApi.types";
import { baseApi } from "@/app/baseApi";
import { DomainTodolist } from "../lib/types";

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((el) => ({ ...el, filter: "all", entityStatus: "idle" }));
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: DomainTodolist }>, string>({
      query: (title) => ({ method: "post", url: "/todo-lists", body: { title } }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({ method: "delete", url: `/todo-lists/${id}` }),
      async onQueryStarted (id, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
            const index = todolists.findIndex((todo) => todo.id === id);
            if (index !== -1) todolists.splice(index, 1);
          }),
        );

        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: builder.mutation<BaseResponse, { title: string; id: string }>({
      query: ({ title, id }) => ({ method: "put", url: `/todo-lists/${id}`, body: { title } }),
      invalidatesTags: ["Todolist"],
    }),
    reorderTodolist: builder.mutation<BaseResponse, {todolistId: string, putAfterItemId: string | null}>({
      query: ({todolistId, putAfterItemId}) => ({
        method: "put",
        url: `/todo-lists/${todolistId}/reorder`,
        body: { putAfterItemId }
      }),
      invalidatesTags: ["Todolist"],
    })
  }),
});

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
  useReorderTodolistMutation
} = todolistsApi;
