# 模拟实现vue-router

## 前置知识
插件、混入、Vue.observable()、插槽、render函数、运行时和完整版的vue

## 核心代码
```js
// ---router/index.js---
// 注册插件
Vue.use(vueRouter)
// 创建路由对象
const router = new VueRouter({
  routes: [
    { name: 'Home', path: '/', component: homeComponent }
  ]
})

// ---main.js---
// 创建Vue实力，注册router对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

## 类图
名称：VueRouter

属性：options\data\routeMap

方法：
    Constructor(Options): VueRouter
    install(Vue): void
    init(): void
    initEvent(): void
    createRouteMap(): void
    initComponents(Vue): void

## 实现

[`src/myVueRouter/index.js`](https://github.com/Humphrey2021/vue-router/blob/main/src/myVueRouter/index.js)