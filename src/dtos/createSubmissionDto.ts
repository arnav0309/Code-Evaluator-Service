import{ z } from 'zod'

// export interface createSubmisssionDto {
//     userId: string,
//     problemId: string,
//     code: string,
//     language: string
// }

export type createSubmisssionDto = z.infer<typeof createSubmisssionZodSchema>

export const createSubmisssionZodSchema = z.object ({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string()
}).strict()