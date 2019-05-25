
## 本地环境配置，hosts 和 nginx

```
127.0.0.1 你的域名
```

``` nginx
server{
    server_name 你的域名
    listen 80;
    
    location /m/{
        proxy_pass http://127.0.0.1:8100/;
        proxy_set_header Host             $host;
        proxy_set_header X-Real-IP        $remote_addr;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```

## 线上环境配置

EGG_SERVER_ENV 分别配置为 beta、test、prod

此项目使用了 CDN，参考 http://ccloud.gz.cvte.cn/docs/nodejs-static-file-cdn.html

## 运行

``` shell
npm start
```

## Session

egg 的 Session 是基于 koa-session 的，其配置与 express-session 不同，比如 name 改为了 key。

## 设置 csrf
``` js
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrfToken');
if (csrfToken) {
    options.headers['x-csrf-token'] = csrfToken;
}
```


## 中间件需要挂载
``` js
// config.default.js
exports.middleware = ['auth', 'locals'];
```

## 出现 Invalid Host header

devServer 设置 disableHostCheck:true
