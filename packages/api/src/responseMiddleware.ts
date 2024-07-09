import type Koa from 'koa';
import { stdResponse, type StdResponseType } from '../../common';

export default function responseMiddleware() {
    return async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
        ctx.type = 'json';
        let body: StdResponseType<unknown> | null = null;

        try {
            await next();
            ctx.status = ctx.status || 200;
            body = stdResponse(
                ctx.response.body || null,
                'Success',
                ctx.status
            );
        } catch (error) {
            const { statusCode, message } = error as {
                statusCode: number;
                message: string;
            };

            ctx.type = 'json';
            ctx.status = statusCode || 500;
            body = stdResponse(null, `Internal error: ${message}`, ctx.status);

            ctx.app.emit('error', error, ctx);
        } finally {
            ctx.body = body;
        }
    };
}
