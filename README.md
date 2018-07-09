# api


把yarn run build 后，把dist里面的代码全选，压成zip，拖到下面的目录下解压

所在目录
server:/home/nipic/projects/apiServer/dist
page:/home/nipic/projects/caoapi


解压覆盖后：
server 永久启动

../node_modules/forever/bin/forever stop app.js   //先关闭之前的
../node_modules/forever/bin/forever start app.js   //启动现在的





> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
