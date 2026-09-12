import { DomainTodolist } from "@/features/todolists/lib/types";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
      }}
    >
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  );
};
