/**
 * 加载一个JavaScript文件
 * @param  {String}   url     JavaScript文件地址
 * @return {[type]}     [description]
 */
export function getJsFile(url) {
  return new Promise((resolve, reject) => {
    const head = document.head || (document.getElementsByTagName('head')[0] || document.documentElement);
    const node = document.createElement('script');
    node.onload = () => resolve();
    node.onerror = error => reject(error);
    node.async = true;
    node.src = url;
    head.appendChild(node);
  });
}

/**
 * [jsonp]构建jsonp请求
 */
export function jsonp(url, callback) {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.setAttribute('src', url);
    body.appendChild(script);
    script.onload = script.onreadystatechange = callback;
}

