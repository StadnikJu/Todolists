export type DomainTask = {
  description: string | null;
  title: string;
  status: number;
  priority: number;
  startDate: string | null;
  deadline: string | null;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModel = Omit<DomainTask, "id" | "todoListId" | "addedDate" | "order" > // вырезает свойства которые не нужны 

export type GetTaskResponse = {
    error: string | null;
    totalCount: number;
    items: DomainTask[];
}