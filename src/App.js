import React from 'react';
import LayoutHeader from './components/Header';
import { renderRoutes } from 'react-router-config';


/**
 * 
 * 路由 / 入口文件
 * 这里 做的主要是 
 * 1. 页面的 Layout 功能
 * 2. 渲染当前路径下面的 子路由
 */
const App = (props) => {
  console.log('props', props);
  return (
    <div>
      <LayoutHeader staticContext={props.staticContext} />
      {renderRoutes(props.route.routes)}
    </div>
  )
}


export default App;