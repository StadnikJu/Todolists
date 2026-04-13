import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";
import { createAppSlice } from "@/common/utils";
import { changeStatusAC } from "@/app/app-slice";

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => {
    return {
      fetchTodolistsTC: create.asyncThunk(
        async (_arg, { rejectWithValue, dispatch }) => {
          try {
            dispatch(changeStatusAC({ status: "loading" }));
            const res = await todolistsApi.getTodolists();
            return res.data;
          } catch (error) {
            return rejectWithValue(error);
          } finally {
            dispatch(changeStatusAC({ status: "idle" }));
          }
        },
        {
          fulfilled: (_state, action) => {
            return action.payload?.map((el) => ({ ...el, filter: "all" }));
          },
        },
      ),
      createTodolistTC: create.asyncThunk(
        async (title: string, { rejectWithValue, dispatch }) => {
          try {
            dispatch(changeStatusAC({ status: "loading" }));
            const res = await todolistsApi.createTodolist(title);
            return { todolist: res.data.data.item };
          } catch (error) {
            return rejectWithValue(null);
          } finally {
            dispatch(changeStatusAC({ status: "idle" }));
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all" });
          },
        },
      ),
      deleteTodolistTC: create.asyncThunk(
        async (args: { id: string }, { rejectWithValue, dispatch }) => {
          try {
            dispatch(changeStatusAC({ status: "loading" }))
            await todolistsApi.deleteTodolist(args.id);
            return args;
          } catch (error) {
            return rejectWithValue(error);
          } finally {
            dispatch(changeStatusAC({ status: "idle" }));
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id);
            if (index !== -1) {
              state.splice(index, 1);
            }
          },
        },
      ),
      changeTodolistTitleTC: create.asyncThunk(
        async (args: { id: string; title: string }, { rejectWithValue, dispatch }) => {
          try {
            dispatch(changeStatusAC({ status: "loading" }))
            await todolistsApi.changeTodolistTitle(args.id, args.title);
            return args;
          } catch (error) {
            return rejectWithValue(error);
          } finally {
            dispatch(changeStatusAC({ status: "idle" }));
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id);
            if (index !== -1) {
              state[index].title = action.payload.title;
            }
          },
        },
      ),
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id);
        if (todolist) {
          todolist.filter = action.payload.filter;
        }
      }),
    };
  },
});

export const { fetchTodolistsTC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC, changeTodolistFilterAC } =
  todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};

export type FilterValues = "all" | "active" | "completed";
