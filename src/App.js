import React from 'react';
import Header from './commonComponents/Header';
import { renderRoutes } from 'react-router-config';
import * as actionCreator from './store/actions/loginAction';

/**
 * 
 * 路由 / 入口文件
 * 这里 做的主要是 
 * 1. 页面的 Layout 功能
 * 2. 渲染当前路径下面的 子路由
 */
const App = (props) => {
  return (
    <div>
      <Header staticContext={props.staticContext} />
      {renderRoutes(props.route.routes)}
    </div>
  )
}
// 这个组件 只需要 loadData 加载数据既可以
// 因为这个组件 不论访问哪个页面 都需要加载这个组件
// 服务端赛过来的 store
App.loadData = (store) => {
  return store.dispatch(actionCreator.getLoginInfo());
}


export default App;