/**
 * 判断浏览器类型
 */

export const getBrowserType = () => {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  //判断是否微信浏览器
  if (userAgent.toLowerCase().indexOf('micromessenger') > -1) {  
    return 'wx';
  };
  //判断是否QQ内置浏览器
  if (userAgent.match(/QQ\/([\d\.]+)/)) {  
    return 'inqq';
  };
  //判断是否Opera浏览器  
  if (userAgent.indexOf('Opera') > -1) {  
    return 'Opera'  
  };   
  //判断是否Firefox浏览器  
  if (userAgent.indexOf('Firefox') > -1) {  
    return 'Firefox';  
  }     
  //判断是否Edge浏览器  
  if (userAgent.indexOf('Edge') > -1) {  
    return 'Edge';  
  };
  //判断是否chorme浏览器  
  if (userAgent.indexOf('Chrome') > -1){  
    return 'Chrome';  
  }  
  //判断是否Safari浏览器  
  if (userAgent.indexOf('Safari') > -1) {  
    return 'Safari';  
  }   
  //判断是否IE浏览器  
  if (((userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) || userAgent.indexOf('Trident') > -1)) {  
    return 'IE';  
  }
}