#!/usr/bin/env node

const path = require('path');

const { exec, fork } = require('child_process');

const chalk = require('chalk');

const socket = require('@cvte/easi-adaptor-capture/dist/socket');

var config = require(path.join(process.cwd(), 'server/config/index'));

const staticServer = fork('./internals/scripts/start-static.js');

staticServer.on('message', function (message) {
	if (message.type === 'start-back-server') {
		// 启动后台node服务
		backServer()
	}
})

function backServer() {

	var child = exec('supervisor --watch ./server -i ./client --inspect=127.0.0.1:9230 server/server.js', {
		maxBuffer: 5000 * 1024, // 默认 200 * 1024
	}, function (error, stdout, stderr) {
		if (error) {
			console.error(`server error: ${error}`);
			return;
		}

		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);

	})

	child.stdout.on('data', function (data) {
		console.log(chalk.yellow(data.toString()));
	});

	child.stderr.on('data', function (data) {
		console.log(chalk.red(data.toString()));
	});

	socket(config.get('wsPort') || 30002);
}