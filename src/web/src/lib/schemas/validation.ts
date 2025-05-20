import {z} from "zod"

export const FormSchema = z.object({
    groupName: z.string().min(2, {
      message: "Group name must be at least 5 characters.",
    }),
})