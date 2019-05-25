import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import './index.less';


interface ToastProps {
  content?: string,       // toast内容，默认为''
}

const ToastItem: React.SFC<ToastProps> = (props: ToastProps) => {
  const { content = '' } = props;
  return (
    <div className='toast-container'>
      <div className='toast'>{ content }</div>
    </div>
  );
};


const visible = Symbol('visible');
const clock = Symbol('clock');
const container = Symbol('container');

export interface ToastOptions extends ToastProps {
  duration: number	      // toast停留时间，单位为ms，默认3000ms
}

class Toast {
  private [visible]: boolean = false;
  private [clock]: any = null;
  private [container]: any = document.createElement('div');

  open(options: ToastOptions) {
    const { content, duration } = options;
    
    if(this[visible]) {
      unmountComponentAtNode(this[container]);
      clearTimeout(this[clock]);
      this[clock] = null;
    } else {
      this[visible] = true;
      document.body.appendChild(this[container]);
    }

    render(<ToastItem content={ content } />, this[container]);
    this[clock] = setTimeout(() => {
      this.close();
    }, duration);
  }

  close() {
    this[visible] = false;
    unmountComponentAtNode(this[container]);
    document.body.removeChild(this[container]);
  }
}

let toastObj = null;
export default function toast(content: string = '', duration: number = 3000) {
  if(!toastObj) {
    toastObj = new Toast();
  }
  toastObj.open({ content, duration });

  return toastObj;
}
