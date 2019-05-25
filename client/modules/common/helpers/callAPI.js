import axios from 'axios';
import EventEmitter from './event';
import Cookies from 'js-cookie';

class CallAPI {
	getOption = (actionName, params) => {
		const data = {
			action: actionName,
			params: params
		};

		const options = {
			url: baseUrl + '/apis.json?actionName=' + actionName + '&ts=' + new Date().getTime(),
			method: 'POST',
			type: 'json',
			data: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const csrfToken = Cookies.get('csrfToken');
		if (csrfToken) {
			options.headers['x-csrf-token'] = csrfToken;
		}

		return options;
	}

	dispatch = (actionName, params) => {
		EventEmitter.emit('http.request', {
			actionName: actionName
		})

		const options = this.getOption(actionName, params);
		return axios(options).then(result => {
			EventEmitter.emit('http.success', {
				actionName: actionName
			})
			return result;
		}).catch(error => {
			EventEmitter.emit('http.fail', {
				actionName: actionName,
				message: error.response.data.message,
				statusCode: error.response.data.statusCode,
			})
			return 1;
		});
	}
}

const callAPI = new CallAPI();

export default callAPI.dispatch.bind(callAPI);