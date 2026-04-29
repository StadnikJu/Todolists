import { catchErrorHandler, createAppSlice, resultCodeHandler } from "@/common/utils";
import { changeStatusAC } from "@/app/app-slice";
import { RequestStatus } from "@/common/types";
import { ResultCode } from "@/common/enum/enums";
import { todolistsApi } from "../../api/todolistsApi";
import { Todolist } from "../../api/todolistsApi.types";
import { todolistSchema } from "../schemes/todolists.schema";

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
            const todolists = todolistSchema.array().parse(res.data); // zod
            return { todolists };
          } catch (error) {
            catchErrorHandler(error, dispatch);
            return rejectWithValue(null);
          } finally {
            dispatch(changeStatusAC({ status: "idle" }));
          }
        },
        {
          fulfilled: (state, action) => {
            return action.payload?.todolists.forEach((el) => {
              state.push({ ...el, filter: "all", entityStatus: "idle" });
            });
          },
        },
      ),
      createTodolistTC: create.asyncThunk(
        async (title: string, { rejectWithValue, dispatch }) => {
          try {
            dispatch(changeStatusAC({ status: "loading" }));

            const res = await todolistsApi.createTodolist(title);

            dispatch(changeStatusAC({ status: "idle" }));

            if (res.data.resultCode === ResultCode.Success) {
              const todolist = todolistSchema.parse(res.data.data.item) // ZOD
              return { todolist };
            } else {
              resultCodeHandler(res.data, dispatch);
              return rejectWithValue(null);
            }

          } catch (error) {
            catchErrorHandler(error, dispatch);
            return rejectWithValue(null);
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
          },
        },
      ),
      deleteTodolistTC: create.asyncThunk(
        async (args: { id: string }, { rejectWithValue, dispatch }) => {
          try {
            dispatch(changeStatusAC({ status: "loading" }));
            dispatch(changeTodolistEntityStatusAC({ id: args.id, entityStatus: "loading" }));
            await todolistsApi.deleteTodolist(args.id);
            return args;
          } catch (error) {
            dispatch(changeTodolistEntityStatusAC({ id: args.id, entityStatus: "failed" }));
            catchErrorHandler(error, dispatch);
            return rejectWithValue(null);
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
            dispatch(changeStatusAC({ status: "loading" }));
            const res = await todolistsApi.changeTodolistTitle(args.id, args.title);

            if(res.data.resultCode === ResultCode.Success) {
              return args;
            } else {
              resultCodeHandler(res.data, dispatch);
              return rejectWithValue(null);
            }
            
          } catch (error) {
            catchErrorHandler(error, dispatch);
            return rejectWithValue(null);
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
      changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id);
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus;
        }
      }),
    };
  },
});

export const {
  fetchTodolistsTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
} = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
  entityStatus: RequestStatus;
};

export type FilterValues = "all" | "active" | "completed";

export const { selectTodolists } = todolistsSlice.selectors;
