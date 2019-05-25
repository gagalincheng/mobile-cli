/**
 * canvas文本自动换行
 * @param  {Object} canvasContext canvas上下文
 * @param  {String} text          输入文本
 * @param  {number} maxWidth      最大宽度
 * @param  {number} x             x轴位置
 * @param  {number} y             y轴位置
 * @param  {number} lineHeight    行高
 */
export function textAutoWrap(canvasContext, text, maxWidth, x, y, lineHeight) {
  const textArr = text.split('');
  let line = '';

  textArr.forEach(item => {
    let temp = line + item;

    if(canvasContext.measureText(temp).width >= maxWidth) {
      canvasContext.fillText(line, x, y);
      line = item;
      y += lineHeight;
    } else {
      line = temp;
    }
  });

  canvasContext.fillText(line, x, y);
}

/**
 * 将文本分行切断
 * @param  {Object} canvasContext canvas上下文
 * @param  {String} text          输入文本
 * @param  {Number} maxWidth      最大宽度
 * @return {Array}                分行结果
 */
export function textGetLine(canvasContext, text, maxWidth) {
  const textArr = text.split('');
  const result = [];
  let line = '';

  textArr.forEach(item => {
    let temp = line + item;

    if(canvasContext.measureText(temp).width >= maxWidth) {
      result.push(line);
      line = item;
    } else {
      line = temp;
    }
  });
  if(line.length > 0) {
    result.push(line);
  }

  return result;
}