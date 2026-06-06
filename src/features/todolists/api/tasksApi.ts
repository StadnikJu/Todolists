import { DomainTask, GetTaskResponse, UpdateTaskModel } from "./tasksApi.types";
import { BaseResponse } from "@/common/types";
import { baseApi } from "@/app/baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTaskResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "post",
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "delete",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "put",
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi;

// export const _tasksApi = {
//   getTasks: (todolistId: string) => {
//     return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`);
//   },
//   createTasks: (args: { todolistId: string; title: string }) => {
//     const { todolistId, title } = args;
//     return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title });
//   },
//   deleteTasks: (args: { todolistId: string; taskId: string }) => {
//     const { todolistId, taskId } = args;
//     return instance.delete<BaseResponse<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
//   },
//   updateTask1: (task: DomainTask) => {
//     const { todoListId, id } = task;
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todoListId}/tasks/${id}`, task);
//   },
//   updateTask: (args: { todolistId: string; taskId: string; model: UpdateTaskModel }) => {
//     const { todolistId, taskId, model } = args;
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
//   },
// };
