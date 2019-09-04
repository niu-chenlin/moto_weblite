import * as Koa from 'koa';
import * as KoaBodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import * as KoaStatic from 'koa-static';
import * as KoaViews from 'koa-views';
import * as nodemailer from 'nodemailer';
import {SequelizeDB} from "./SequlizeDB";
import * as session from "koa-session";
import {apiDispatcher, initApis} from "./apiAction/api";

const app = new Koa();
const router:Router = new Router();

//koa-session
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess', //cookie密钥 默认koa:sess
    maxAge: 1000*10, //cookie过期时间 默认1天
    autoCommit: true, //自动提交头文件
    overwrite: true,  //是否可覆盖
    httpOnly: true,   //cookie是否只有服务器端可以访问
    signed: true,     //是否签名
    rolling: false //强制在每个响应上设置会话标识符cookie。这将重置cookie过期时间。
};
app.use(session(CONFIG, app));

router.get('/', async (ctx) => {
    await ctx.render('index');
});
router.get('/motor', async (ctx) => {
    await ctx.render('motor');
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
    await apiDispatcher(ctx);
});
router.post('/noSession/', async (ctx) => {
    console.log("noSession：");
    console.log(ctx.request.body);
    console.log(ctx.session);
    ctx.session.username = ctx.request.body.paras.phone;
    ctx.session.password = ctx.request.body.paras.password;
    ctx.body = ctx;
});
router.post('/session/', async (ctx) => {
    //登录时创建session
    console.log("session：");
    console.log(ctx.request);
    console.log(ctx.session.username);
    console.log(ctx.session.password);
    ctx.body = ctx;
});
app.use(KoaBodyParser());
app.use(KoaViews('src/template', {extension: 'html', map: {html: 'ejs'}}));
app.use(KoaStatic('src/static'));
app.use(router.routes()).use(router.allowedMethods());
SequelizeDB.init();
initApis();
app.listen(3000, () => {
    console.log("run......");
});