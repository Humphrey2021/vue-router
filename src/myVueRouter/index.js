let _Vue = null

export default class VueRouter {
    // 可以让vue注册插件 Vue.use(VueRouter),内部需要有一个 install 静态方法
    static install(Vue) {
        // 1. 判断当前插件是否已经安装
        if (VueRouter.install.installed) return
        VueRouter.install.installed = true
        // 2. 把Vue构造函数记录到全局变量
        _Vue = Vue
        // 3. 把创建Vue实例时候传入的router对象注入到Vue实例上
        // _Vue.prototype.$router = this.$options.router
        // 使用混入的方法
        _Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                }
            }
        })
    }
    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/'
        })
        this.init()
    }
    init() {
        this.createRouteMap()
        this.initComponents(_Vue)
        this.initEvent()
    }
    createRouteMap() {
        // 遍历所有的路由规则，把路由规则解析成键值对的形式存储到routeMap中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }
    initComponents(Vue) {
        /**
         * Vue的构建版本 --- vue/cli创建的项目，默认使用的是运行时的版本
         * 运行时版：不支持 template 模版，需要打包的时候提前编译
         * 完整版：包含运行时和编译器，体积比运行时版大10K左右，程序运行的时候把模版转换成 render 函数
         */
        Vue.component('router-link', {
            props: {
                to: String
            },
            // 解决方法一：修改 vue.config.js 配置
            // template: '<a :href="to"><slot></slot></a>'
            // 解决方法二：使用 render 函数
            render (h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickhander
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickhander(e) {
                    history.pushState({}, '', this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                }
            }
        })
        const self = this
        Vue.component('router-view', {
            render (h) {
                const component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }
    initEvent () {
        // 当历史发生变化的时候触发
        window.addEventListener('popstate', () => {
            this.data.current = window.location.pathname
        })
    }
}
