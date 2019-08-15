import * as Koa from 'koa';
import * as KoaBodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import * as KoaStatic from 'koa-static';
import * as KoaViews from 'koa-views';
import * as nodemailer from 'nodemailer';
import {SequelizeDB} from "./SequlizeDB";

const app = new Koa();
const router:Router = new Router();

router.get('/', async (ctx) => {
    await ctx.render('index');
});
router.post('/cooperation/', async (ctx) => {
    const data = ctx.request.body;
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secure: true,
        port: 465,
        auth: {
            user: "2544675996@qq.com",
            pass: "pkbvqmpgiikedicc"
        }
    });
    transporter.sendMail({
        from: "2544675996@qq.com",
        to: '2544675996@qq.com',
        subject: '商家合作',
        html: `<div>来自${data.name}的合作申请，申请内容：${data.content}</div>`,
        date: new Date(),
    });
    ctx.response.body = 'success';
});
router.post('/api/', async (ctx) => {
    const data = ctx.request.body;

});

app.use(KoaBodyParser());
app.use(KoaViews('src/template', {extension: 'html', map: {html: 'ejs'}}));
app.use(KoaStatic('src/static'));
app.use(router.routes()).use(router.allowedMethods());
SequelizeDB.init();
app.listen(3000, () => {
    console.log("run......");
});