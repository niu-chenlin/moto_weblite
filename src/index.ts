import * as Koa from 'koa';
import * as KoaBodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import * as KoaStatic from 'koa-static';
import * as KoaViews from 'koa-views';

const app = new Koa();
const router:Router = new Router();

router.get('/', async (ctx) => {
    await ctx.render('index');
});
app.use(KoaBodyParser());
app.use(KoaViews('src/template', {extension: 'html', map: {html: 'ejs'}}));
app.use(KoaStatic('src/static'));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log("run......");
});