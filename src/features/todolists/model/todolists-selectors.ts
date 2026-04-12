import type { RootState } from "@/app/store";
import type { DomainTodolist } from "./todolists-slice";

export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists;
