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

