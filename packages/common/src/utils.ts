export type StdResponseType<T> = {
    data: T | null;
    message: string | null;
    status: number;
};

export function stdResponse<T>(
    data: T,
    message: string | null,
    status: number = 200
): StdResponseType<T> {
    return {
        data: data,
        message,
        status
    };
}
