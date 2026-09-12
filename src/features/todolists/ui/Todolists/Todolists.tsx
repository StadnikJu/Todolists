import { TodolistItem } from "./TodolistItem/TodolistItem";
import { useGetTodolistsQuery, useReorderTodolistMutation } from "@/features/todolists/api/todolistsApi";
import { Box } from "@mui/material";
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton";
import { containerSx } from "@/common/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export const Todolists = () => {
  const { data, isLoading } = useGetTodolistsQuery();
  const [reorderTodolist] = useReorderTodolistMutation();

  const handleDragEndTodolist = (event: DragEndEvent) => {
    const activeId = String(event.active.id);
    const overId = event.over?.id;

    if (!overId || !data) return;

    const oldIndex = data?.findIndex((e) => e.id === activeId);
    const newIndex = data?.findIndex((e) => e.id === overId);

    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(data, oldIndex, newIndex);
    const putAfterItemId = newIndex === 0 ? null : newItems[newIndex - 1].id;

    reorderTodolist({todolistId: activeId, putAfterItemId});
  };

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEndTodolist}>
      <SortableContext items={data?.map((task) => task.id) ?? []} strategy={verticalListSortingStrategy}>
        {data?.map((todolist) => (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        ))}
      </SortableContext>
    </DndContext>
  );
};
