import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { CreateItemForm } from "@/common/components";
import { EditableSpan } from "@/common/components";
import { todolistsApi } from "@/features/todolists/api/todolistsApi";
import { Todolist } from "@/features/todolists/api/todolistsApi.types";
import { tasksApi } from "@/features/todolists/api/tasksApi";
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types";
import { TaskStatus } from "@/common/enum/enums";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({});

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data;
      setTodolists(todolists);

      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          setTasks((prev) => ({ ...prev, [todolist.id]: res.data.items }));
        });
      });
    });
  }, []);

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item;
      setTodolists((prev) => [newTodolist, ...prev]);
    });
  };

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists((prev) => prev.filter((el) => el.id !== id));
    });
  };

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle(id, title).then(() => {
      setTodolists((prev) => prev.map((el) => (el.id === id ? { ...el, title } : el)));
    });
  };

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTasks({ todolistId, title }).then((res) => {
      const newTask = res.data.data.item;
      setTasks((prev) => ({ ...prev, [todolistId]: [newTask, ...prev[todolistId]] }));
    });
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTasks({ todolistId, taskId }).then(() => {
      setTasks((prev) => ({ ...prev, [todolistId]: prev[todolistId].filter((task) => task.id !== taskId) }));
    });
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: newStatus,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };
    tasksApi.updateTaskStatus({ todolistId: task.todoListId, taskId: task.id, model }).then(() => {
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.todoListId].map((el) =>
          el.id === task.id ? { ...el, status: model.status } : el,
        ),
      }));
    });
  };

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const model: UpdateTaskModel = {
      description: task.description,
      title: title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };

    tasksApi.updateTaskTitle({ todolistId: task.todoListId, taskId: task.id, model }).then(() => {
      setTasks((prev) => ({
        ...prev,
        [task.todoListId]: prev[task.id].map((el) => (el.id === task.id ? { ...el, title: model.title } : el)),
      }));
    });
  };

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map((todolist: Todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan value={todolist.title} onChange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task: DomainTask) => (
            <div key={task.id}>
              <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};
