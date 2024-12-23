import { z } from "zod";

// * SIGN IN SCHEMA
export const AIMessageSchema = z.object({
  message: z
    .string()
    .min(3, { message: "Enter at least 3 characters" })
    .max(1000, { message: "Maximum of 1000 characters" }),
  sender: z.string(),
  response: z.string(),
  response_time: z.string(),
});
export type AIMessageSchemaType = z.infer<typeof AIMessageSchema>;
