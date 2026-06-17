import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import {
  todolistsApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} from "@/features/todolists/api/todolistsApi";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styles from "./TodolistTitle.module.css";
import { useAppDispatch } from "@/common/hooks";
import { ResultCode } from "@/common/enum/enums";
import { RequestStatus } from "@/common/types";
import { DomainTodolist } from "@/features/todolists/lib/types";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist;
  const [deleteTodolist] = useDeleteTodolistMutation();
  const [changeTodolistTitle] = useChangeTodolistTitleMutation();
  const dispatch = useAppDispatch();

  const changeEntityStatus = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
        const todolist = todolists.find((todolist) => todolist.id === id);
        if (todolist) {
          todolist.entityStatus = status;
        }
      }),
    );
  };

  const deleteTodolistHandler = () => {
    changeEntityStatus("loading");

    deleteTodolist(id)
      .unwrap()
      .then((res) => {
        if (res.resultCode === ResultCode.Success) {
          changeEntityStatus("idle");
        }
      })
      .catch(() => {
        changeEntityStatus("idle");
      });
  };
  
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
