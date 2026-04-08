import { instance } from "@/common/instance";
import { DomainTask, GetTaskResponse, UpdateTaskModel } from "./tasksApi.types";
import { BaseResponse } from "@/common/types";

export const tasksApi = {
  getTasks: (todolistId: string) => {
    return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTasks: (args: { todolistId: string; title: string }) => {
    const { todolistId, title } = args;
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTasks: (args: { todolistId: string; taskId: string }) => {
    const { todolistId, taskId } = args;
    return instance.delete<BaseResponse<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTaskStatus: (args: { todolistId: string; taskId: string; model: UpdateTaskModel }) => {
    const { todolistId, taskId, model } = args;
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  updateTaskTitle: (args: { todolistId: string; taskId: string; model: UpdateTaskModel }) => {
    const { todolistId, taskId, model } = args;
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};