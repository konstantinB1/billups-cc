import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import registerRoutes from './endpoints';
import { StdResponseType, stdResponse } from '../../common/src';

const app = new Koa();
const router = new Router();

router.use(async (ctx, next) => {
    ctx.type = 'json';
    let body: StdResponseType<unknown>;

    try {
        await next();
        ctx.status = ctx.status || 200;
        console.log('Response body:', ctx.response.body);
        body = stdResponse(ctx.response.body || null, 'Success', ctx.status);
    } catch (error) {
        const { statusCode, message } = error as any;

        ctx.type = 'json';
        ctx.status = statusCode || 500;
        body = stdResponse(null, `Internal error: ${message}`, ctx.status);

        ctx.app.emit('error', error, ctx);
    } finally {
        ctx.body = body;
    }
});

app.on('error', (err) => {
    console.error('Server error', err);
});

registerRoutes(router);

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
});
