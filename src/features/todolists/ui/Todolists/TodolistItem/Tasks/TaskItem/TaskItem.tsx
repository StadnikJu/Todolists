import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import type { ChangeEvent } from "react";
import { getListItemSx } from "./TaskItem.styles";
import { TaskStatus } from "@/common/enum/enums";
import { DomainTask } from "@/features/todolists/api/tasksApi.types";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/tasksApi";
import { createTaskModel } from "@/common/utils";
import { DomainTodolist } from "@/features/todolists/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: DomainTask;
  todolistId: string;
  todolist: DomainTodolist;
};

export const TaskItem = ({ task, todolist }: Props) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const deleteTaskHandler = () => deleteTask({ todolistId: todolist.id, taskId: task.id });

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    const model = createTaskModel(task, { status: newStatusValue });
    updateTask({ todolistId: task.todoListId, taskId: task.id, model });
  };

  const changeTaskTitle = (title: string) => {
    const model = createTaskModel(task, { title });
    updateTask({ todolistId: task.todoListId, taskId: task.id, model });
  };

  const isTaskCompleted = task.status === TaskStatus.Completed;
  const disabled = todolist.entityStatus === "loading";

  return (
    <ListItem
      sx={{
        ...getListItemSx(isTaskCompleted),
        cursor: "grab",
        "&:active": {
          cursor: "grabbing",
        },
      }}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} disabled={disabled} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={disabled} />
      </div>
      <IconButton onClick={deleteTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
