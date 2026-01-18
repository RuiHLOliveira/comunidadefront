import Request from '@/core/request.js'
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js';
import { reactive } from 'vue';

export const CursosStorage = reactive({
    
    cursos: [],
    forceNextReload: false,

    // funcionalidades de storage
    index(){
        return new Promise((resolve, reject) => {
            console.log('this.forceNextReload',this.forceNextReload)
            if(this.cursos.length > 0 && !this.forceNextReload) {
                resolve([null,this.cursos]);
            } else {
                console.log('loadFromApi')
                this.loadFromApi(resolve, reject);
            }
        });
    },

    criar(curso) {
        return new Promise((resolve, reject) => {
            this.apiCriar(curso)
            .then(([response,data]) => {
                this.forceNextReload = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },
    
    editar(curso) {
        return new Promise((resolve, reject) => {
            this.apiEditar(curso)
            .then(([response,data]) => {
                this.forceNextReload = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },

    substituir(curso) {
        if(this.cursos == null || this.cursos.length == 0) return;
        const index = this.cursos.findIndex(e => e.id === curso.id);
        this.cursos[index] = curso;
    },

    loadFromApi(resolve, reject) {
        this.apiLoad().then(([response,data]) => {
            this.cursos = data
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
            'url': `${config.serverUrl}/cursos${params}`,
        };
        return Request.fetch(requestData)
    },

    apiEditar(curso) {
        const url = `${config.serverUrl}/cursos/${curso.id}`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'nome': curso.nome,
        };
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'PUT',
            'data' : body
        };
        return Request.fetch(requestData);
    },

    apiCriar(curso) {
        const url = `${config.serverUrl}/cursos`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'nome': curso.nome,
            'nome': curso.nome,
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
