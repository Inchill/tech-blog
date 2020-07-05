const Koa = require('koa');
const app = new Koa();
const router = require('./router.ts');
const bodyParser = require('koa-bodyparser');
const koajwt = require('koa-jwt');  // koa中对token校验的中间件
const koaStatic = require('koa-static');
const path = require('path');

// 错误处理
app.use(async (ctx, next) => {
    return next().catch(err => {
        if(err.status === 401) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    })
});
// unless表示不对登录注册做token校验(颁发token时密钥是secret)
// 最后一个规则是开放根路径，使得首页不需要鉴权即可通过后端访问
app.use(koajwt({ secret: 'secret' }).unless({ 
    path: [
        /^\/users\/login/, 
        /^\/users\/register/, 
        /^\/users\/info/,
        /^\/blogs\/list/,
        /^\/blogs\/sort/,
        /^\/blogs\/id/,
        /^\/blogs\/email/,
        /^\/blogs\/search/,
        /^\/blogs\/comments/,
        /^\//
    ] 
}));
router(app);
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, './public/dist')));

app.listen(3001, () => {
    console.log('server is running at http://localhost:3001...');
});