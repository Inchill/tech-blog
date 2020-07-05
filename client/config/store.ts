import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')),
        token: JSON.parse(localStorage.getItem('token'))
    },
    getters: {
        getUser: state => state.user,
        getToken: state => state.token
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload.user;
            // 数据持久化
            localStorage.setItem('user', JSON.stringify(payload.user));
        },
        setToken(state, payload) {
            state.token = payload.token;
            localStorage.setItem('token', JSON.stringify(payload.token));
        },
        logout(state) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            state.user = null;
            state.token = '';
        }
    }
});

export default store;