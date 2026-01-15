import Request from '@/core/request.js'
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js';
import { reactive } from 'vue';

export const PostsStorage = reactive({
    
    posts: [],
    forceNextReload: false,

    // funcionalidades de storage
    index(){
        return new Promise((resolve, reject) => {
            console.log('this.forceNextReload',this.forceNextReload)
            if(this.posts.length > 0 && !this.forceNextReload) {
                resolve([null,this.posts]);
            } else {
                console.log('loadFromApi')
                this.loadFromApi(resolve, reject);
            }
        });
    },

    criar(post) {
        return new Promise((resolve, reject) => {
            this.apiCriar(post)
            .then(([response,data]) => {
                this.forceNextReload = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },
    
    editar(post) {
        return new Promise((resolve, reject) => {
            this.apiEditar(post)
            .then(([response,data]) => {
                this.forceNextReload = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },

    substituir(post) {
        if(this.posts == null || this.posts.length == 0) return;
        const index = this.posts.findIndex(e => e.id === post.id);
        this.posts[index] = post;
    },

    loadFromApi(resolve, reject) {
        this.apiLoad().then(([response,data]) => {
            this.posts = data
            this.forceNextReload = false;
            resolve([response,data]);
        }).catch((error) => {
            reject(error)
        });
    },

    // funcionalidades de api
    apiLoad() {
        let params = {
            'relations': '',
            'orderBy': 'created_at,asc'
        };
        params = QueryStringConverter.toQueryString(params, true);
        let requestData = {
            'url': `${config.serverUrl}/posts${params}`,
        };
        return Request.fetch(requestData)
    },

    apiEditar(post) {
        const url = `${config.serverUrl}/posts/${post.id}`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'conteudo': post.conteudo,
        };
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'PUT',
            'data' : body
        };
        return Request.fetch(requestData);
    },

    apiCriar(post) {
        debugger
        const url = `${config.serverUrl}/posts`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'nome': post.nome,
            'introducao': post.introducao,
            'conteudo': post.conteudo,
        };
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'POST',
            'data' : body
        };
        return Request.fetch(requestData);
    }

});
