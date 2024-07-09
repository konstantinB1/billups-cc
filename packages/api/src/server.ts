import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import registerRoutes from './endpoints';
import responseMiddleware from './responseMiddleware';

function createApp() {
    const app = new Koa();
    const router = new Router();

    router.use(responseMiddleware());

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
}

createApp();
