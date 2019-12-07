## webpack 
1. 选项 -- watch 
文件更新 自动打包
2. webpack-node-externals
node 自带模块采用 external 形式

## 中间层

1. 请求流程
fe - node - api
## 无中间层流程
1. 请求流程
fe-api
fe-node
node-api

假如fe 出错了 有可能是 node server 也有可能是 api server
介入中间层 中转 fe 出错 直接找 node 然后 node 出错 就再找 api server

## 多级路由嵌套
简单一层路由： 可以简单使用 map
多级路由采用： react-router-config 提供的 renderRoutes


## 涉及登录的时候
服务端 cookie 处理
把 req 传递给 axiosIns

## 404 处理
服务端：context 传递 一个对象 {}
组件
获取 staticContext 在里面添加一个 { notFound: true}
然后 服务端再次判断 决定 404 还是 200


