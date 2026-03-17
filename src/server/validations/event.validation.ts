import {z} from "zod";

export const eventCreateSchema = z.object({
    name: z.string().min(3, {message: "name must be provided"}),
    description: z.string().min(3, {message: "description must be provided"}),
    location: z.string().min(3, {message: "location must be provided"}),
    image: z.string().min(3, {message: "image must be provided"}),
    date: z.string().min(3, {message: "date must be provided"}),
});

export type EventCreate = z.infer<typeof eventCreateSchema>;

export const eventUpdateSchema = z.object({
    id: z.string().min(3, {message: "id must be provided"}),
    name: z.string().min(3, {message: "name must be provided"}),
    description: z.string().min(3, {message: "description must be provided"}),
    location: z.string().min(3, {message: "location must be provided"}),
    image: z.string().min(3, {message: "image must be provided"}),
    date: z.string().min(3, {message: "date must be provided"}),
});

export type EventUpdate = z.infer<typeof eventUpdateSchema>;

