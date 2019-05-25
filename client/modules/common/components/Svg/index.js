/**
*
* Svg
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import './index.less';


class Svg extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { svg, className } = this.props;
    const svgProps = omit(this.props, ['svg']);
    svgProps.className = `svg-wrapper ${className || ''}`;

    return (
      <div { ...svgProps } >
        <svg className='svg-item'>
          <use xlinkHref={`#${svg.id}`} />
        </svg>
      </div>
    );
  }
}

Svg.propTypes = {
  svg: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Svg;
