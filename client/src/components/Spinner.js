import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div className='absolute top-1/2	left-1/2 -translate-x-2/4	-translate-y-64	'>
      <Spin size='large' />
    </div>
  );
};

export default Spinner;
