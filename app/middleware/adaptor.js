/*
 * Adaptor，添加向后台请求的函数
*/
// const Adaptor = require('@cvte/easi-adaptor');
const _ = require('lodash');

module.exports = options => async function adaptor(ctx, next) {

    // const config = ctx.app.config;
    // const cookies = ctx.cookies;

    // const token = cookies.get('x-token', { signed: false });

    // const unitid = cookies.get('unitUid', { signed: false });

    // const ip = ctx.headers['x-real-ip'];
    

    // const headers = {
    //     'x-unitid': unitid || '',
    //     'xx-real-ip': ip || '',
    //     'x-traceid': Date.now() + _.uniqueId('-school-')
    // };

    // const client = ctx.headers['x-client'];
    

    // if(client){
    //     headers['x-client'] = client;
    // }

    // const adaptorConfig = {
    //     validatiors: {},
    //     apis: ctx.app.apis,
    //     http: {
    //         headers: headers,
    //         baseURL: config.serverUrl
    //     },
    //     mock: {
    //         baseURL: config.mockApiUrl,
    //     }
    // }

    // const _adaptor = new Adaptor(adaptorConfig);
    // ctx.callAPI = _adaptor.dispatch.bind(_adaptor);

    await next();
}