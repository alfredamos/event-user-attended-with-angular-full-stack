export class CustomError implements Error{
    constructor(public name: string, public message: string, public status: number) {
    }

    stack?: string | undefined;
    cause?: unknown;
}