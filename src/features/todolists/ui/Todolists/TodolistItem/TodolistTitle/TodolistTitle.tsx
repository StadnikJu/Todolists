import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi";
import { DomainTodolist } from "@/features/todolists/lib/types";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styles from "./TodolistTitle.module.css";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title  } = todolist;
  const [deleteTodolist] = useDeleteTodolistMutation();
  const [changeTodolistTitle] = useChangeTodolistTitleMutation();

  const deleteTodolistHandler = () => deleteTodolist(id);
  const changeTodolistTitleHandler = (title: string) => changeTodolistTitle({ title, id });

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
