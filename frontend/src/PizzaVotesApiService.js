import Vue from 'vue';
// Promise-based HTTP client
import axios from 'axios';

// API conection
const client = axios.create({
    baseURL: 'http://localhost:5000/api/pizzavotes',
    json: true
});

export default {

    async execute(method, resource, data) {
        console.debug("execute (method, resource, data) -> " ,method, resource, data );

        console.debug("accessToken await " );
        const accessToken = await Vue.prototype.$auth.getAccessToken();
        console.debug("accessToken -> ", accessToken);

        return client({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(req => {
            console.debug('req.data -> ', req.data);
            return req.data;
        })
    },

    getAll() {
        console.debug('getAll ');
        return this.execute('get', '/');
    },
    
    getById(id) {
        console.debug('getById (id) -> ', id);
        return this.execute('get', `/${id}`);
    },

    create(data) {
        console.debug('create (data) -> ', data );
        return this.execute('post', '/', data);
    },

    update(id, data) {
        console.debug('update (id, data) -> ', id,  data);
        return this.execute('put', `/${id}`, data);
    },
};