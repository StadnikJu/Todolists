import { TaskItem } from "./TaskItem/TaskItem";
import { TaskStatus } from "@/common/enum/enums";
import { useGetTasksQuery, useReorderTaskMutation } from "@/features/todolists/api/tasksApi";
import { TasksSkeleton } from "./TasksSkeleton/TasksSkeleton";
import { DomainTodolist } from "@/features/todolists/lib/types";
import { useState } from "react";
import { TasksPagination } from "./TasksPagination/TasksPagination";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import List from "@mui/material/List";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist;
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetTasksQuery({ todolistId: id, params: { page } });
  const [reorderTask] = useReorderTaskMutation();


  const handleDragEnd = (event: DragEndEvent) => {
    const activeId = String(event.active.id);
    const overId = event.over?.id;

    if (!overId || !filteredTasks) return;
    
    const oldIndex = filteredTasks?.findIndex((e) => e.id === activeId);
    const newIndex = filteredTasks?.findIndex((e) => e.id === overId);

    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(filteredTasks, oldIndex, newIndex);
    const putAfterItemId = newIndex === 0 ? null : newItems[newIndex - 1].id;

    reorderTask({todolistId: id,  taskId: activeId,  putAfterItemId})
  };



  let filteredTasks = data?.items;
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New);
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed);
  }
  if (isLoading || isFetching) {
    return <TasksSkeleton />;
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredTasks?.map((task) => task.id) ?? []} strategy={verticalListSortingStrategy}>
        {filteredTasks?.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <>
            <List>
              {filteredTasks?.map((task) => (
                <TaskItem key={task.id} task={task} todolist={todolist} todolistId={id} />
              ))}
            </List>
            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
          </>
        )}
      </SortableContext>
    </DndContext>
  );
};
