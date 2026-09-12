import { DomainTodolist } from "@/features/todolists/lib/types";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistItem = ({ todolist }: Props) => {
  const [createTask] = useCreateTaskMutation();

  const createTaskHandler = (title: string) => createTask({ todolistId: todolist.id, title });

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todolist.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Box
          component="div"
          {...attributes}
          {...listeners}
          sx={{ cursor: "grab", ":active": { cursor: "grabbing" }}}
        />
        <div style={{ flex: 1 }}>
          <TodolistTitle todolist={todolist} />
        </div>
      </div>
      <CreateItemForm onCreateItem={createTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  );
};
