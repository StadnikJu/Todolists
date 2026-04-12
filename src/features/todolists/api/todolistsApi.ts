import { instance } from "@/common/instance/instance";
import { BaseResponse } from "@/common/types";
import { DomainTodolist } from "../model/todolists-slice";

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<DomainTodolist[]>("/todo-lists");
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponse<{ item: DomainTodolist }>>("/todo-lists", { title });
  },
  deleteTodolist: (id: string) => {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`);
  },
  changeTodolistTitle: (id: string, title: string) => {
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title });
  },
};