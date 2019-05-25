#!/usr/bin/env node

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('../webpack.config');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, config.devServer);

server.listen(config.devServer.port);
