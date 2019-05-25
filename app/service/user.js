const Service = require('egg').Service;

class UserService extends Service {
  checkToken() {
    const { cookies } = this.ctx;
    const token = cookies.get('x-token', { signed: false });

    return !!token;
  }

  logout(url) {
    const { xTokenDomain, defaultUrl } = this.config;
    const { cookies } = this.ctx;
    const redirectUrl = url || defaultUrl;

    // 将token失效
    cookies.set('x-token', '', {
      signed: false,
      httpOnly: true,
      domain: xTokenDomain,
      maxAge: 0
    });

    this.ctx.redirect(redirectUrl);
  }
}

module.exports = UserService;