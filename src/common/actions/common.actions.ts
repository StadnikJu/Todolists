import { TasksState } from "@/features/todolists/model/slices/tasks-slice";
import { DomainTodolist } from "@/features/todolists/model/slices/todolists-slice";
import { createAction } from "@reduxjs/toolkit";

export type ClearTasksAndTodolistsType = {
    tasks: TasksState,
    todolists: DomainTodolist[];
}

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>("common/clear-tasks-todolists"); 