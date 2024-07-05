import Koa from 'koa';
import Router from '@koa/router';
import { getAllChoices, getRandomChoice } from './logic';

const app = new Koa();
const router = new Router();

console.log(process.cwd());

router.get('/choice', async (ctx) => {
    ctx.body = await getRandomChoice();
});

router.get('/choices', (ctx) => {
    ctx.body = getAllChoices();
});

router.use(async (ctx, next) => {
    ctx.accepts('json');
    await next();
});

router.post('/play', (ctx) => {});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
});
