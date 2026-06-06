import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { DomainTodolist } from "@/features/todolists/model/slices/todolists-slice";
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styles from "./TodolistTitle.module.css";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist;
  const [deleteTodolist] = useDeleteTodolistMutation();
  const [changeTodolistTitle] = useChangeTodolistTitleMutation();

  const deleteTodolistHandler = () => deleteTodolist(id);
  const changeTodolistTitleHandler = (title: string) => changeTodolistTitle({ title, id });

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
