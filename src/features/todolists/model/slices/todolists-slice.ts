import { RequestStatus } from "@/common/types";
import { Todolist } from "../../api/todolistsApi.types";
import { clearTasksAndTodolists } from "@/common/actions/common.actions";
import { createAppSlice } from "@/common/utils";

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id);
        if (todolist) {
          todolist.filter = action.payload.filter;
        }
      }),
      changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id);
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus;
        }
      }),
    };
  },
  extraReducers: (builder) => {
    builder.addCase(clearTasksAndTodolists, (_state, action) => {
      return action.payload.todolists;
    });
  },
});

export const { changeTodolistFilterAC, changeTodolistEntityStatusAC } = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
  entityStatus: RequestStatus;
};

export type FilterValues = "all" | "active" | "completed";

export const { selectTodolists } = todolistsSlice.selectors;
