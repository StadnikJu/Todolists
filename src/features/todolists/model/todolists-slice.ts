import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todolist } from "../api/todolistsApi.types";
import { todolistsApi } from "../api/todolistsApi";

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.id);
        if (todolist) {
          todolist.filter = action.payload.filter;
        }
      }),
    };
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
        return action.payload.map((el) => ({ ...el, filter: "all" }));
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.push(action.payload);
      })
  }
});

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`, 
  async (_arg, {rejectWithValue}) => {
  try {
    const res = await todolistsApi.getTodolists();
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`, 
  async (args: { id: string, title: string }, {rejectWithValue}) => {
    try {
      await todolistsApi.changeTodolistTitle(args.id, args.title);
      return args
    } catch (error) {
      return rejectWithValue(error);
    }
});

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`, 
  async (args: { id: string }, { rejectWithValue }) => {
    try {
      await todolistsApi.deleteTodolist(args.id);
      return args
    } catch (error) {
      return rejectWithValue(error);
    }
});

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (args: { title: string }, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.createTodolist(args.title);
      return { ...res.data.data.item, filter: "all" as const };
    } catch (error) {
      return rejectWithValue(error);
    }
});


export const {  changeTodolistFilterAC } = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};

export type FilterValues = "all" | "active" | "completed";
