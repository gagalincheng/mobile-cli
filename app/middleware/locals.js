const path = require('path');
const _ = require('lodash');
const assetPath = path.join(__dirname, '../../', 'build/statics');

function getAssetData() {
    try {
        return require(path.join(assetPath, 'asset.json'));
    } catch (e) {
        console.warn(e);
        return {};
    }
}

module.exports = options => async (ctx, next) => {
    
    // varies变量中的数据会被渲染到HTML中
    const { hostPrefix, baseUrl  } = ctx.app.config;
    ctx.locals.varies = { copyright: 2019, baseUrl };


    //以下是对 asset 的处理，添加 getChunkJS 用户获取 build 生成的 js 文件
    const assetData = getAssetData();
    const chunks = assetData.chunks;
    const chunksMap = {};
    
    ctx.locals.assets = assetData;
    for(let item in chunks) {
        if(chunks.hasOwnProperty(item)) {
          const jsArr = _.get(chunks, [item, 'js'], []);
          chunksMap[item] = jsArr.map(item => `<script type="text/javascript" src="${ctx.app.config.assetUrl + item}"></script>`).join('');
        }
    }

    ctx.locals.chunksMap = chunksMap;

    await next();
}