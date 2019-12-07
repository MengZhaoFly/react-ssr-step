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
app.use(express.static('mock'));

// 客户端请求以 baseURL: '/mapi', 开始
// 客户端经过中间层代理
app.use('/mapi', proxy('http://localhost:3003', {
  proxyReqPathResolver: function(req) {
    return '/mapi' + req.url
  }
}));


app.get('*', function (req, res) {
  const store = getStore(req);
  // 需要用户请求地址 来判断 到底加载哪里的数据
  // /login Login 组件 / Home 组件
  // inside a request

  const promises = [];
  // 从 router 配置中 选出 req.path 命中的 路由
  let matchedRouters = matchRoutes(routes, req.path);
  // 把 路由上面需要请求的 promise 放到 promise 数组中
  matchedRouters.forEach(mRouter => {
    if (mRouter.route.loadData) {
      // loadData() 可以收到一个 store
      promises.push(mRouter.route.loadData(store));
    }
  })
  // 服务端请求拿到数据之后 渲染模版返回
  
  Promise.all(promises).then(resArr => {
    let context = {}
    let renderHtml = render(req, store, routes, context);
    console.log('服务端请求拿到数据之后', context);
    if (context.notFound) {
      res.statusCode = 404;
    } 
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