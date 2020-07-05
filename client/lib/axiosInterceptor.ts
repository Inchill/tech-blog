import Axios from 'axios';

Axios.interceptors.request.use(config => {
    if(process.env.NODE_ENV === 'development') {
        config.url = '/api' + config.url;
    }
    let token = JSON.parse(localStorage.getItem('token'));
    if(token) {
        config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

Axios.interceptors.response.use((response) => {
    return response;
}, error => {
    if(error.response.status === 401) {
        const data = {
            code: -1,
            msg: '登录超时'
        };
        return Promise.reject(data);
    }
    return Promise.reject(error);
})

export default Axios;