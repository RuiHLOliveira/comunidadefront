import Request from '@/core/request.js'
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js';
import { reactive } from 'vue';

export const AulasStorage = reactive({
    
    aulas: [],
    forceNextReload: [],

    debugReloadParams(name, idModulo){
        console.log(`[${name}] aulas`,this.aulas)
        if(this.aulas[idModulo]){
            console.log(`[aula] aulas idModulo`,this.aulas[idModulo])
        }
        console.log(`[aula] forceNextReload`, this.forceNextReload)
        if(this.forceNextReload[idModulo]){
            console.log(`[aula] forceNextReload idModulo`, this.forceNextReload[idModulo])
        }
    },

    // funcionalidades de storage
    index(idModulo){
        return new Promise((resolve, reject) => {
            const name = 'aulas';
            this.debugReloadParams(name, idModulo);
            if(this.aulas[idModulo] != undefined && this.aulas[idModulo].length > 0 && !this.forceNextReload[idModulo]) {
                console.log(`[${name}] loadFromCache`)
                resolve([null,this.aulas[idModulo]]);
            } else {
                console.log(`[${name}] loadFromApi`)
                this.loadFromApi(idModulo, resolve, reject);
            }
        });
    },

    criar(idModulo, nomeAula, urlLinkAula) {
        return new Promise((resolve, reject) => {
            this.apiCriar(idModulo, nomeAula, urlLinkAula)
            .then(([response,data]) => {
                this.forceNextReload[idModulo] = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },
    
    editar(idAula, nomeAula, urlLinkAula) {
        return new Promise((resolve, reject) => {
            this.apiEditar(idAula, nomeAula, urlLinkAula)
            .then(([response,data]) => {
                this.forceNextReload[idModulo] = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },

    loadFromApi(idModulo, resolve, reject) {
        this.apiLoad(idModulo).then(([response,data]) => {
            this.aulas[idModulo] = data
            this.forceNextReload[idModulo] = false;
            resolve([response,data]);
        }).catch((error) => {
            reject(error)
        });
    },

    // funcionalidades de api
    apiLoad(idModulo) {
        let params = {
            'relations': '',
            'orderBy': 'created_at,asc',
            'modulo': idModulo
        };
        params = QueryStringConverter.toQueryString(params, true);
        let requestData = {
            'url': `${config.serverUrl}/aulas${params}`,
        };
        return Request.fetch(requestData)
    },

    apiCriar(idModulo, nomeAula, urlLinkAula) {
        const url = `${config.serverUrl}/aulas`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'modulo': idModulo,
            'nome': nomeAula,
            'url': urlLinkAula
        };
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'POST',
            'data' : body
        };
        return Request.fetch(requestData);
    },

    apiEditar(idAula, nomeAula, urlLinkAula) {
        const url = `${config.serverUrl}/aulas/${idAula}`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'nome': nomeAula,
            'url': urlLinkAula
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
