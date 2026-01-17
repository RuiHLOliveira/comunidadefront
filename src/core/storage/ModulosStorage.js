import Request from '@/core/request.js'
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js';
import { reactive } from 'vue';

export const ModulosStorage = reactive({
    
    modulos: [],
    forceNextReload: [],

    debugReloadParams(name, idCurso){
        console.log(`[${name}] modulos`,this.modulos)
        if(this.modulos[idCurso]){
            console.log(`[modulo] modulos idCurso`,this.modulos[idCurso])
        }
        console.log(`[modulo] forceNextReload`, this.forceNextReload)
        if(this.forceNextReload[idCurso]){
            console.log(`[modulo] forceNextReload idCurso`, this.forceNextReload[idCurso])
        }
    },

    // funcionalidades de storage
    index(idCurso){
        return new Promise((resolve, reject) => {
            const name = 'modulos';
            this.debugReloadParams(name, idCurso);
            if(this.modulos[idCurso] != undefined && this.modulos[idCurso].length > 0 && !this.forceNextReload[idCurso]) {
                console.log(`[${name}] loadFromCache`)
                resolve([null,this.modulos[idCurso]]);
            } else {
                console.log(`[${name}] loadFromApi`)
                this.loadFromApi(idCurso, resolve, reject);
            }
        });
    },

    criar(idCurso, nomeModulo) {
        return new Promise((resolve, reject) => {
            this.apiCriar(idCurso, nomeModulo)
            .then(([response,data]) => {
                this.forceNextReload[idCurso] = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },
    
    editar(idModulo, nomeModulo) {
        return new Promise((resolve, reject) => {
            this.apiEditar(idModulo, nomeModulo)
            .then(([response,data]) => {
                this.forceNextReload[idCurso] = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },

    // substituir(curso) {
    //     if(this.cursos == null || this.cursos.length == 0) return;
    //     const index = this.cursos.findIndex(e => e.id === curso.id);
    //     this.cursos[index] = curso;
    // },

    loadFromApi(idCurso, resolve, reject) {
        this.apiLoad(idCurso).then(([response,data]) => {
            this.modulos[idCurso] = data
            this.forceNextReload[idCurso] = false;
            resolve([response,data]);
        }).catch((error) => {
            reject(error)
        });
    },

    // funcionalidades de api
    apiLoad(idCurso) {
        let params = {
            'relations': '',
            'orderBy': 'created_at,asc',
            'curso': idCurso
        };
        params = QueryStringConverter.toQueryString(params, true);
        let requestData = {
            'url': `${config.serverUrl}/modulos${params}`,
        };
        return Request.fetch(requestData)
    },

    apiCriar(idCurso, nome) {
        const url = `${config.serverUrl}/modulos`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'curso': idCurso,
            'nome': nome
        };
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'POST',
            'data' : body
        };
        return Request.fetch(requestData);
    },

    apiEditar(idModulo, nome) {
        const url = `${config.serverUrl}/modulos/${idModulo}`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'nome': nome,
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
