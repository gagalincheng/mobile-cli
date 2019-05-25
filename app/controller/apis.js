const _ = require('lodash');
const Controller = require('egg').Controller;

class ApisController extends Controller {
  async index() {
    const actionName = this.ctx.query['actionName'];
    const params = this.ctx.request.body || {};

    // 请求不存在的 actionName，返回404
    if (!actionName || !_.has(this.app.apis, actionName)) {
      var respData = {
        success: false,
        statusCode: 404,
        message: 'Action ' + actionName + ' is not exist!',
      };
      this.ctx.status = 404;
      this.ctx.response.body = respData;
    }
    else {
      try {
        //请求后台接口，并返回结果
        const result = await this.ctx.callAPI(actionName, { params: params });
        this.ctx.body = result.res.data;
        // 日志打印到文件
        const resplog = { 
          ..._.get(result, 'http'), 
          ..._.get(result, 'api.http'),
          params: _.get(result, 'params'),
          data: _.get(result, 'res.data')
        };
        this.ctx.logger.info(resplog);
      } catch (error) {
        this.ctx.status = 500;
        this.ctx.body = {
          success: false,
          message: error.message
        }
        // 日志打印到文件
        const errorlog = {
          header: error.config.headers,
          method: error.config.method,
          url: error.config.url,
          params: error.config.params,
          ...error.response.data
        }
        this.ctx.logger.error(errorlog);
      }
    }
  }
}

module.exports = ApisController;