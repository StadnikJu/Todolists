// import { catchErrorHandler, createAppSlice } from "@/common/utils";
// import { changeStatusAC } from "@/app/app-slice";
// import { RootState } from "@/app/store";
// import { ResultCode } from "@/common/enum/enums";
// import { tasksApi } from "../../api/tasksApi";
// import { DomainTask, UpdateTaskModel } from "../../api/tasksApi.types";

// import { clearTasksAndTodolists } from "@/common/actions/common.actions";

// export const tasksSlice = createAppSlice({
//   name: "tasks",
//   initialState: {} as TasksState,
//   selectors: {
//     selectTasks: (state) => state,
//   },
//   reducers: (create) => {
//     return {
//       // fetchTasksTC: create.asyncThunk(
//       //   async (todolistId: string, { rejectWithValue, dispatch }) => {
//       //     try {
//       //       dispatch(changeStatusAC({ status: "loading" }));
//       //       const res = await tasksApi.getTasks(todolistId);
//       //       const tasks = domainTaskSchema.array().parse(res.data.items); // zod
//       //       return { todolistId, tasks };
//       //     } catch (error) {
//       //       catchErrorHandler(error, dispatch);
//       //       return rejectWithValue(null);
//       //     } finally {
//       //       dispatch(changeStatusAC({ status: "idle" }));
//       //     }
//       //   },
//       //   {
//       //     fulfilled: (state, action) => {
//       //       state[action.payload.todolistId] = action.payload.tasks;
//       //     },
//       //   },
//       // ),
//       // createTaskTC: create.asyncThunk(
//       //   async (args: { todolistId: string; title: string }, { rejectWithValue, dispatch }) => {
//       //     try {
//       //       dispatch(changeStatusAC({ status: "loading" }));
//       //       const res = await tasksApi.createTasks(args);

//       //       if (res.data.resultCode === ResultCode.Success) {
//       //         const newTask = domainTaskSchema.parse(res.data.data.item); // ZOD
//       //         return newTask;
//       //       } else {
//       //         resultCodeHandler(res.data, dispatch);
//       //         return rejectWithValue(null);
//       //       }
//       //     } catch (error) {
//       //       catchErrorHandler(error, dispatch);
//       //       return rejectWithValue(null);
//       //     } finally {
//       //       dispatch(changeStatusAC({ status: "idle" }));
//       //     }
//       //   },
//       //   {
//       //     fulfilled: (state, action) => {
//       //       const newTask = action.payload;
//       //       state[newTask.todoListId].unshift(newTask);
//       //     },
//       //   },
//       // ),
//       // deleteTaskTC: create.asyncThunk(
//       //   async (args: { todolistId: string; taskId: string }, { rejectWithValue, dispatch }) => {
//       //     try {
//       //       dispatch(changeStatusAC({ status: "loading" }));
//       //       const res = await tasksApi.deleteTasks(args);
//       //       if (res.data.resultCode === ResultCode.Success) {
//       //         return args;
//       //       } else {
//       //         catchErrorHandler(res.data, dispatch);
//       //         return rejectWithValue(null);
//       //       }
//       //     } catch (error) {
//       //       catchErrorHandler(error, dispatch);
//       //       return rejectWithValue(null);
//       //     } finally {
//       //       dispatch(changeStatusAC({ status: "idle" }));
//       //     }
//       //   },
//       //   {
//       //     fulfilled: (state, action) => {
//       //       const tasks = state[action.payload.todolistId];
//       //       const index = tasks.findIndex((task) => task.id === action.payload.taskId);
//       //       if (index !== -1) {
//       //         tasks.splice(index, 1);
//       //       }
//       //     },
//       //   },
//       // ),
//       // updateTaskTC: create.asyncThunk(
//       //   async (
//       //     args: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
//       //     { rejectWithValue, dispatch, getState },
//       //   ) => {
//       //     try {
//       //       dispatch(changeStatusAC({ status: "loading" }));

//       //       const taskState = (getState() as RootState).tasks;
//       //       const taskForTodolist = taskState[args.todolistId];
//       //       const changedTask = taskForTodolist.find((task) => task.id === args.taskId);

//       //       if (!changedTask) {
//       //         throw new Error("Task not found");
//       //       }

//       //       const model: UpdateTaskModel = {
//       //         description: changedTask.description,
//       //         title: changedTask.title,
//       //         status: changedTask.status,
//       //         priority: changedTask.priority,
//       //         startDate: changedTask.startDate,
//       //         deadline: changedTask.deadline,
//       //         ...args.domainModel,
//       //       };

//       //       const res = await tasksApi.updateTask({ todolistId: args.todolistId, taskId: args.taskId, model });

//       //       if (res.data.resultCode === ResultCode.Success) {
//       //         const updatedTask = domainTaskSchema.parse(res.data.data.item); // ZOD
//       //         return { task: updatedTask };
//       //       } else {
//       //         catchErrorHandler(res.data, dispatch);
//       //         return rejectWithValue(null);
//       //       }
//       //     } catch (error) {
//       //       catchErrorHandler(error, dispatch);
//       //       return rejectWithValue(null);
//       //     } finally {
//       //       dispatch(changeStatusAC({ status: "idle" }));
//       //     }
//       //   },
//       //   {
//       //     fulfilled: (state, action) => {
//       //       const task = state[action.payload.task.todoListId];
//       //       const taskIndex = task.findIndex((t) => t.id === action.payload.task.id);

//       //       if (taskIndex !== -1) {
//       //         task[taskIndex] = action.payload.task;
//       //       }
//       //     },
//       //   },
//       // )
//     };
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(clearTasksAndTodolists, (_state, action) => {
//         return action.payload.tasks;
//       })
//   },
// });

// export const { updateTaskTC } = tasksSlice.actions;
// export const tasksReducer = tasksSlice.reducer;

// export type Task = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };

// export type TasksState = Record<string, DomainTask[]>;

// export const { selectTasks } = tasksSlice.selectors;
