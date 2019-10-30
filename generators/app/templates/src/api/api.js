import http from './http'

class Api {
    constructor() {
        this.http = http
    }

    getListData(params) {
       return this.http.get('static/mock/appListData.json', params)
    }

    getLookUp(params) {
       return this.http.get('static/mock//lookUp.json', params)
    }

    getRecomendData(params) {
       return this.http.get('static/mock/recomendData.json', params)
    }
}

export default new Api()

