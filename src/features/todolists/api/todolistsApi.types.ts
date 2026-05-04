import * as z from "zod";
import { todolistSchema } from "../model/schemes/todolists.schema";

export type Todolist = z.infer<typeof todolistSchema>;
