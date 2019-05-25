module.exports = () => {
    return async function notFoundHandler(ctx, next) {
        await next();

        //在路由请求之后，判断是否为 404
        if (ctx.status === 404 && !ctx.body) {
            if (ctx.acceptJSON) {
                ctx.body = { code: 404, error: 'Not Found' };
            } else {
                await ctx.render('404.html');
            }
        }
    };
};