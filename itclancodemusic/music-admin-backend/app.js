const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')  // 导入koa-router
const router = new Router()           // new 实例化对象
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const ENV = 'music-test-5c8tz'

// 跨域
app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}))

// 接收post参数解析
app.use(koaBody({
    multipart: true,
}))

app.use(async (ctx, next)=>{
    console.log('全局中间件')
    // ctx.body = 'Hello Wolrd'
    ctx.state.env = ENV
    await next()
})

const playlist = require('./controller/playlist.js')
const swiper = require('./controller/swiper.js')
const blog = require('./controller/blog.js')

router.use('/playlist', playlist.routes())  // 定义好路由
router.use('/swiper', swiper.routes())
router.use('/blog', blog.routes())

app.use(router.routes())
app.use(router.allowedMethods())  // 允许方法的使用



app.listen(3000, ()=>{
    console.log('服务开启在3000端口')
})

// MVC