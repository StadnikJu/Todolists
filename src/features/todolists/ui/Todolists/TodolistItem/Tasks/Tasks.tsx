import { TaskItem } from "./TaskItem/TaskItem";
import { TaskStatus } from "@/common/enum/enums";
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi";
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton";
import List from "@mui/material/List";
import { DomainTodolist } from "@/features/todolists/lib/types";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist;

  const { data, isLoading } = useGetTasksQuery(id);

  let filteredTasks = data?.items;
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New);
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed);
  }
  if (isLoading) {
    return <TasksSkeleton />;
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
