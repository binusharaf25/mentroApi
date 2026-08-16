import { z } from "zod";

export const taskSchemaValidate = z.object({
  title: z.string().min(1, "Title is reqiured  minimum character is two"),
  description: z.string().optional(),
  status: z.enum(["pending", "in progress", "completed"]).optional(),
  DueDate: z.string().optional(),
});
