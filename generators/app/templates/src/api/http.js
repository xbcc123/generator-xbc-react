import axios from 'axios'

// 配置axios
let instance = axios.create({
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
 
)

// 返回拦截器
instance.interceptors.response.use(
    response => {
        if (!response.status === 200) {
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default {
    /**
     * GET请求
     *
     * @param {*} url 请求地址
     * @param {*} param 请求参数
     */
    get(url, params) {
        if (!url) {
            return
        }
        return new Promise((resolve, reject) => {
            instance.get(url, params).then(response => {
                const { status, data } = response
                if (status === 200) {
                    resolve(data)
                } else {
                    reject(response)
                } 
            })
        })
    },

    /**
     * POST请求
     *
     * @param {*} url 请求地址
     * @param {*} params 请求参数
     */
    post(url, params) {
        if (!url) {
            return
        }
        return new Promise((resolve, reject) => {
            instance.post(url, params).then(response => {
              const { status, data } = response
              if (status === 200) {
                  resolve(data)
              } else {
                  reject(response)
              } 
            })
        })
    },

    /**
     * 文件上传
     *
     * @param {*} url 地址
     * @param {*} formData 表单数据
     */
    upload(url, formData) {
        if (!url) {
            return
        }
        return new Promise((resolve, reject) => {
            instance
                .post(url, formData, {
                    headers: {
                        'Content-Type': 'multiple/form-data'
                    }
                })
                resolve(response)
                .then(response => {
                   const { status, data } = response
                   if (status === 200) {
                       resolve(data)
                   } else {
                       reject(response)
                   } 
                })
        })
    }
}
