module.exports = {

    // 环境变量配置
    development: {
        envObj: {
            NODE_ENV: '"development"',
            API_HOST: '"/"',
        }
    },

    production: {
        envObj: {
            NODE_ENV: '"production"',
            API_HOST: '""',
        }
    },

}