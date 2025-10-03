import { z } from "zod";

// VALIDATION: Defines form validation rules using Zod
// This ensures all assignment data meets requirements before submission
export const createAssignmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  totalMarks: z.string().min(1, "Total marks is required"),
  assignmentFile: z.any().refine((files) => files?.length > 0, "File is required")
});