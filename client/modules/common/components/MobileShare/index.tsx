import * as React from 'react';
import './styles/index.less';


export interface MobileShareProps {
  onClose: () => void
}

const MobileShare: React.SFC<MobileShareProps> = (props: MobileShareProps):JSX.Element => {
  const { onClose } = props;
  return (
    <div className='mobile-share' onClick={ onClose }>
      <div className='mobile-share-tip' />
    </div>
  );
}

export default MobileShare;