import axios from 'axios'
import router from '../router'
// const baseUrl = 'http://localhost:8888/'
const baseUrl = 'https://www.bestlifebestyue.com/admin-api/'
/*
* url 地址 string
* method 请求方式 string
* params 参数 object
*/

const _axios = (url, method, params) => {
    if ( url == '' || url == undefined ) {
        console.error('url 不能为空!') 
        return;
    }
    if ( method != 'get' && method != 'GET' && method != 'post' && method != 'POST') {
        console.error('method 方式不对，暂只支持GET和POST。') 
        return;
    }
    let _url = baseUrl + url
    let accessToken = sessionStorage.getItem('accessToken')
    if ( method == 'GET' || method == 'get') {
        if ( params != undefined && params != {} ) {
            _url = _url + '?'
            for (let i in params ) {
                _url += i + '=' + params[i] + '&'
            }
            _url = _url.slice(0, _url.length - 1)
        }

        return new Promise((resolve, reject) => {
            axios.get(_url, { headers: {
                'access-token': accessToken
            }}).then(res => {
                let data = res.data
                if (data.code == '666666') {
                    router.replace('/')
                } else {
                    resolve(data)
                }
            })
        })
    }

    if ( method == 'POST' || method == 'post') {
        return new Promise((resolve, reject) => {
            axios.post(_url, params,{ headers: {
                'access-token': accessToken
            }}).then(res => {
                let data = res.data
                if (data.code == '666666') {
                    router.replace('/')
                } else {
                    if (url == 'api/loginin' && data.code == '000000') {
                        sessionStorage.setItem('accessToken', data.data.sessionContent)
                        sessionStorage.setItem('accessTokenEndTime', new Date(data.data.sessionEndTime).getTime())
                    }
                    resolve(data)
                }
            })
        })

    }
    // router.replace('/')
}

export { _axios }

