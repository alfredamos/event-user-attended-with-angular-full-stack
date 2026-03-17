import {z} from "zod";
import {Status} from "../../generated/prisma/enums";

export const attendeeCreateSchema = z.object({
    eventId: z.string().min(3, {message: "EventId must be provided"}),
    userId: z.string().min(3, {message: "UserId must be provided"}),
});


export type AttendeeCreate = z.infer<typeof attendeeCreateSchema>;

export const attendeeEditSchema = z.object({
    eventId: z.string().min(3, {message: "EventId must be provided"}),
    userId: z.string().min(3, {message: "UserId must be provided"}),
    status: z.enum(Status, {message: "Status must be provided"}),
});


export type AttendeeEdit = z.infer<typeof attendeeEditSchema>;
