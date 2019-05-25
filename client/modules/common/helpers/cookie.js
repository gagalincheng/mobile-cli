const Cookie = {
  set: function(key, val, time, domain){  //设置cookie方法
		var date = new Date();
		var expiresDays = time;
		date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
		var domainStr = !!domain ? (';domain=' + domain) : '';
    console.log(key + '=' + val + ';expires=' + date.toGMTString() + domainStr)
		document.cookie = key + '=' + val + ';expires=' + date.toGMTString() + domainStr;
	},
	get: function(key){   //获取cookie方法
		var getCookie = document.cookie.replace(/[ ]/g, ''); 
		var arrCookie = getCookie.split(';')
		var tips;
		for(var i = 0;i < arrCookie.length;i++){
			var arr = arrCookie[i].split('=');
			if(key === arr[0]){
				tips = arr[1];
				break;
			} 
		}
		return tips;
	}
}

export default Cookie;