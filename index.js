const egg = require('egg');
const options = {
    port: 13800,
    workers: 2
};

egg.startCluster(options, () => {
    console.log('started');
});