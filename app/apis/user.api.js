/**
 * user API 列表
 * 约定API名称跟action名称保持一致
 */

var userApis = {
  GET_USER_INFO: {
    adaptorName: 'http',
    http: {
      url:'/v1/user/info',
      method:'GET'
    }
  }
}

module.exports = userApis;