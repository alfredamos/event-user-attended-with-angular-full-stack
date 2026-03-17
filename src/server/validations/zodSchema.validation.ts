import { StatusCodes } from "http-status-codes";
import { ZodType as ZodSchema } from "zod";
import catchError from "http-errors";

export function validateWithZodSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw catchError(StatusCodes.BAD_REQUEST, `${result.error.message}`);
    }

    return result.data;
}
