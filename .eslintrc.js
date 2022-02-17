module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        // 'plugin:vue/essential',
        'plugin:vue/recommended',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-debugger': 'off',
        //禁止console报错检查
        'no-console': 'off',
        'indent': 4,
        //禁止空格报错检查
        'generator-star-spacing': 'off'
    }

}
