import * as z from "zod";  
import { LoginSchema } from "./schemes/loginSchema";

export  type LoginInputs = z.infer<typeof LoginSchema>;