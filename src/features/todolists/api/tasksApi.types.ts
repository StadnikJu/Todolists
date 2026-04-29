import * as z from "zod"; 
import { domainTaskSchema } from "../model/schemes/todolists.schema";

export type DomainTask = z.infer<typeof domainTaskSchema>

export type UpdateTaskModel = Omit<DomainTask, "id" | "todoListId" | "addedDate" | "order" > // вырезает свойства которые не нужны 

export type GetTaskResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
}
