import Request from '@/core/request.js'
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js';
import { reactive } from 'vue';

export const HabitosStorage = reactive({
    
    habitos: [],
    forceNextReload: false,

    // funcionalidades de storage
    index(){
        return new Promise((resolve, reject) => {
            console.log('this.forceNextReload',this.forceNextReload)
            if(this.habitos.length > 0 && !this.forceNextReload) {
                resolve([null,this.habitos]);
            } else {
                console.log('loadFromApi')
                this.loadFromApi(resolve, reject);
            }
        });
    },

    concluir(habito, textoObservacao) {
        return new Promise((resolve, reject) => {
            this.apiConcluir(habito, textoObservacao)
            .then(([response,data]) => {
                this.forceNextReload = true;
                // nao faz pois é melhor fazer por reload
                // this.substituir(habito); // substituir o habito antigo pelo novo
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },

    criar(habito) {
        return new Promise((resolve, reject) => {
            this.apiCriar(habito)
            .then(([response,data]) => {
                this.forceNextReload = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },
    
    editar(habito) {
        return new Promise((resolve, reject) => {
            this.apiEditar(habito)
            .then(([response,data]) => {
                this.forceNextReload = true;
                resolve([response,data]);
            }).catch((error) => {
                reject(error)
            });
        });
    },

    substituir(habito) {
        if(this.habitos == null || this.habitos.length == 0) return;
        const index = this.habitos.findIndex(e => e.id === habito.id);
        this.habitos[index] = habito;
    },

    loadFromApi(resolve, reject) {
        this.apiLoad().then(([response,data]) => {
            this.habitos = data
            this.forceNextReload = false;
            resolve([response,data]);
        }).catch((error) => {
            reject(error)
        });
    },

    // funcionalidades de api
    apiLoad() {
        let params = {
            'relations': 'habitoRealizados',
            'orderBy': 'hora,asc'
        };
        params = QueryStringConverter.toQueryString(params, true);
        let requestData = {
            'url': `${config.serverUrl}/habitos${params}`,
        };
        return Request.fetch(requestData)
    },

    apiConcluir(habito, textoObservacao) {
        const url = `${config.serverUrl}/habitos/${habito.id}/concluir`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {'textoObservacao': textoObservacao}
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'POST',
            'data' : body
        };
        return Request.fetch(requestData);
    },

    apiEditar(habito) {
        const url = `${config.serverUrl}/habitos/${habito.id}`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'descricao': habito.descricao,
            'motivo': habito.motivo,
            'hora': habito.hora,
        };
        let requestData = {
            'url': url,
            'headers': headers,
            'method' : 'PUT',
            'data' : body
        };
        return Request.fetch(requestData);
    },

    apiCriar(habito) {
        const url = `${config.serverUrl}/habitos`
        const headers = new Headers({'Content-Type': 'application/json'})
        const body = {
            'descricao': habito.descricao,
            'motivo': habito.motivo,
            'hora': habito.hora,
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
