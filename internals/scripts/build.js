var webpack = require('webpack');
var config = require('../webpack/webpack.production.babel');

webpack(config, function (err, stats) {
    if (err) { throw err; }

    const info = stats.toJson();
    if (stats.hasErrors()) {
        console.log('================ 来自 build.js 的提示：打包失败，错误如下 ================');
        console.log(info.errors);
        process.exit(1);
    }
})
