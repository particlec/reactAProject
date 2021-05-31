import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';

import Clip from '../botton';
import GlobalContext from '../globalContext';

function SideLayout({ component: Component, matchProps }) {
  return (
    <GlobalContext.Provider>
      <Layout className="content">
        {/* 路由动态内容 start */}
        <Component {...matchProps} />
        <Clip />
        {/* 路由动态内容 end */}
      </Layout>
    </GlobalContext.Provider>
  );
}

export default SideLayout;
