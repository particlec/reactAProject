import { Layout } from 'antd';
import React from 'react';
import ClipBottom from '../botton';

function SideLayout({ component: Component, matchProps }) {
  return (
    <Layout className="content">
      {/* 路由动态内容 start */}
      <Component {...matchProps} />
      <ClipBottom />
      {/* 路由动态内容 end */}
    </Layout>
  );
}

export default SideLayout;
