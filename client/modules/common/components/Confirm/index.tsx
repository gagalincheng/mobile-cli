import * as React from 'react';
import ConfirmModal from './ConfirmModal';
import { render, unmountComponentAtNode } from 'react-dom';

export interface ConfirmConfig {
  title?: string,                            // 标题
  content?: string | React.ReactNode,        // 内容
  btnText?: string,                          // 按钮文字
  onOk?: () => any,                          // 按钮监听函数，若返回值为false或状态为rejected的Promise对象则不会自动关闭弹窗
  onCancel?: () => any,                      // 点击背景关闭弹窗的事件，若返回值为false或状态为rejected的Promise对象则不会自动关闭弹窗
}

const visible = Symbol('visible');
const container = Symbol('container');
const options = Symbol('options');

class Confirm {
  private [visible]: boolean = false;
  private [container]: any = document.createElement('div');
  private [options]: object = {};

  open(config: ConfirmConfig = {}) {
    if(this[visible]) {
      return;
    }

    // 处理点击事件
    // 若点击事件返回false，或返回Promise对象且其状态最终为reject，则不自动关闭弹窗
    const handleOk = () => {
      let result = config.onOk ? config.onOk() : true;
      // 把返回值为undefined视为true，即为可关闭的状态
      result = result === undefined ? true : result;
      return Promise.resolve(result).then(() => {
        if(result) {
          this.close();
        }
      });
    };
    const handleCancel = () => {
      let result = config.onCancel ? config.onCancel() : true;
      // 把返回值为undefined视为true，即为可关闭的状态
      result = result === undefined ? true : result;
      return Promise.resolve(result).then(() => {
        if(result) {
          this.close();
        }
      });
    }

    this[visible] = true;
    this[options] = {
      ...config,
      onOk: handleOk,
      onCancel: handleCancel
    };
    document.body.appendChild(this[container]);
    render(<ConfirmModal { ...this[options] } />, this[container]);
  }

  close() {
    this[visible] = false;
    unmountComponentAtNode(this[container]);
    document.body.removeChild(this[container]);
  }
}

let confirmObj = null;
export default function confirm(opts: ConfirmConfig) {
  if(!confirmObj) {
    confirmObj = new Confirm();
  }
  confirmObj.open(opts);

  return confirmObj;
}
