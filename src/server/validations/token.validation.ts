import {z} from 'zod'

export const tokenShema = z.object({
    accessToken: z.string().min(1, {message: 'accessToken must be provided'}),
    refreshToken: z.string().min(1, {message: 'refreshToken must be provided'}),
    userId: z.string().min(1, {message: 'userId must be provided'}),
});

export type Token = z.infer<typeof tokenShema>