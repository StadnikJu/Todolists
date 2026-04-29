import { useAppSelector } from "@/common/hooks/useAppSelector";
import { TaskItem } from "./TaskItem/TaskItem";
import List from "@mui/material/List";
import { useEffect } from "react";
import { useAppDispatch } from "@/common/hooks";
import { TaskStatus } from "@/common/enum/enums";
import { DomainTodolist } from "@/features/todolists/model/slices/todolists-slice";
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/slices/tasks-slice";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist;

  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id));
  }, []);

  const todolistTasks = tasks[id];
  let filteredTasks = todolistTasks;
  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New);
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed);
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todolist={todolist} todolistId={id} />
          ))}
        </List>
      )}
    </>
  );
};
