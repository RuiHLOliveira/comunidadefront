import Request from '@/core/request.js'
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js';
import { reactive } from 'vue';

export const ComentariosStorage = reactive({
    
    comentarios: [],
    forceNextReload: [],

    // funcionalidades de storage
    index(idPost){
        return new Promise((resolve, reject) => {
            console.log('this.forceNextReload',this.forceNextReload[idPost])
            if(this.comentarios[idPost] != undefined && this.comentarios[idPost].length > 0 && !this.forceNextReload[idPost]) {
                resolve([null,this.comentarios[idPost]]);
            } else {
                console.log('loadFromApi')
                this.loadFromApi(idPost, resolve, reject);
            }
        });
    },

    criar(idPost, conteudoComentario, idComentarioPai = null) {
        return new Promise((resolve, reject) => {
            this.apiCriar(idPost, conteudoComentario, idComentarioPai)
            .then(([response,data]) => {
                this.forceNextReload[idPost] = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },
    
    editar(idComentario, conteudoComentario) {
        return new Promise((resolve, reject) => {
            this.apiEditar(idComentario, conteudoComentario)
            .then(([response,data]) => {
                this.forceNextReload[idPost] = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },

    // substituir(post) {
    //     if(this.posts == null || this.posts.length == 0) return;
    //     const index = this.posts.findIndex(e => e.id === post.id);
    //     this.posts[index] = post;
    // },

    loadFromApi(idPost, resolve, reject) {
        this.apiLoad(idPost).then(([response,data]) => {
            this.comentarios[idPost] = data
            this.forceNextReload[idPost] = true;
            resolve([response,data]);
        }).catch((error) => {
            reject(error)
        });
    },

    // funcionalidades de api
    apiLoad(idPost) {
        let params = {
            'relations': '',
            'orderBy': 'created_at,asc',
            'post': idPost
        };
        params = QueryStringConverter.toQueryString(params, true);
        let requestData = {
            'url': `${config.serverUrl}/comentarios${params}`,
        };
        return Request.fetch(requestData)
    },

    apiCriar(idPost, conteudo, idComentarioPai = null) {
        const url = `${config.serverUrl}/comentarios`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'post': idPost,
            'conteudo': conteudo,
            'comentariopai': idComentarioPai
        };
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'POST',
            'data' : body
        };
        return Request.fetch(requestData);
    },

    apiEditar(idComentario, conteudo) {
        const url = `${config.serverUrl}/comentarios/${idComentario}`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'conteudo': conteudo,
        };
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'PUT',
            'data' : body
        };
        return Request.fetch(requestData);
    },

});
