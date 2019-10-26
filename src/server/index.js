import express from 'express';
import React from 'React';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom';
import path from 'path';
import proxy from 'express-http-proxy';
import { matchRoutes, renderRoutes } from "react-router-config";
import routes from '../Routes.js';
import { getStore } from '../store/index';
import { render } from './utils';

const app = express();
app.use(express.static('public'));

app.use('/api', proxy('http://neteasecloudmusicapi.zhaoboy.com', {
  // proxyReqPathResolver: function(req) {
  // }
}));


app.get('*', function (req, res) {
  const store = getStore();
  // 需要用户请求地址 来判断 到底加载哪里的数据
  // /login Login 组件 / Home 组件
  // inside a request

  const promises = [];
  // 从 router 配置中 选出 req.path 命中的 路由
  let matchedRouters = matchRoutes(routes, req.path);
  // 把 路由上面需要请求的 promise 放到 promise 数组中
  matchedRouters.forEach(mRouter => {
    if (mRouter.route.loadData) {
      promises.push(mRouter.route.loadData(store));
    }
  })
  // 服务端请求拿到数据之后 渲染模版返回
  Promise.all(promises).then(resArr => {
    let renderHtml = render(req, store, routes);
    console.log('renderHtml', renderHtml);
    res.send(renderHtml);
  })
  .catch(err => {
    console.log('服务端出错信息：', err);
  });
  // const html = render(req);
  // res.send(html);
});

app.listen(3000, () => {
  console.log(`server is running http://localhost:3000`);
});