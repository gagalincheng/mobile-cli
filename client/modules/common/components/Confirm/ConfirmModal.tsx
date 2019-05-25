import * as React from 'react';
import './index.less';


export interface ConfirmModalProps {
  title?: string,
  content?: string | React.ReactNode,
  btnText?: string,
  onOk?: () => any,
  onCancel?: () => any,
}

const ConfirmModal: React.SFC<ConfirmModalProps> = (props: ConfirmModalProps) => {
  const {
    title = '',
    content = '',
    btnText = '确定',
    onOk = () => null,
    onCancel = () => null,
  } = props;

  return (
    <div className='confirm-modal'>
      <div className='modal-background' onClick={ onCancel } />
      <div className='modal-body'>
        <h2 className='modal-title'>{ title }</h2>
        { !!content && <div className='modal-content'>{ content }</div> }
        <button className='accent-btn btn-confirm' onClick={ onOk }>{ btnText }</button>
      </div>
    </div>
  ); 
}

export default ConfirmModal;
