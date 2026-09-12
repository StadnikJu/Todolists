import { DomainTask, GetTaskResponse, UpdateTaskModel } from "./tasksApi.types";
import { BaseResponse } from "@/common/types";
import { baseApi } from "@/app/baseApi";
import { PAGE_SIZE } from "@/common/constants";

type Patch = {
  op: "replace" | "remove" | "add";
  path: (string | number)[];
  value?: any;
};

type PageCollection = {
  patches: Patch[];
  inversePatches: Patch[];
  undo: () => void;
};

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTaskResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "post",
        body: { title },
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "delete",
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "put",
        body: model,
      }),
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const args = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks");

        const patchResults: PageCollection[] = [];

        args.forEach((e) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, params: { page: e.params.page } }, (response) => {
                const index = response.items.findIndex((task) => task.id === taskId);
                if (index !== -1) {
                  response.items[index] = { ...response.items[index], ...model };
                }
              }),
            ),
          );
        });

        try {
          await queryFulfilled;
        } catch (e) {
          patchResults.forEach((patchResult) => patchResult.undo());
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    reorderTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string; putAfterItemId: string | null}>({
      query: ({ todolistId, taskId, putAfterItemId }) => ({
        method: "put",
        url: `/todo-lists/${todolistId}/tasks/${taskId}/reorder`,
        body: { putAfterItemId },
      }),
      invalidatesTags: (_result, _error, {todolistId}) => [{type: "Task", id: todolistId}]
    }),

  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useReorderTaskMutation } = tasksApi;
