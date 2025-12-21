import Request from '@/core/request.js'
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js';
import { reactive } from 'vue';

export const HistoricosStorage = reactive({

    historicos: [],
    version: null,

    index(){
        return new Promise(async (resolve, reject) => {

            const newVersion = null;//await this.checkVersion();
            let reload = false;

            if(this.version == null || newVersion > this.version){
                reload = true;
            }

            if(reload) {
                this.apiLoad().then(([response,data]) => {
                    this.historicos = data
                    resolve([response,data]);
                }).catch((error) => {
                    reject(error)
                });
                return;
            }
            
            if(!reload){
                resolve([{local: true},this.historicos]);
                return;
            }

        });
    },

    // checkVersion() {
    //     let requestData = {
    //         'url': `${config.serverUrl}/historicos/version`,
    //     };
    //     return Request.fetch(requestData)
    // },

    apiLoad() {
        let params = {
            // 'relations': 'habitoRealizados',
            'orderBy': 'createdAt, desc'
        };
        params = QueryStringConverter.toQueryString(params, true);
        let requestData = {
            'url': `${config.serverUrl}/historicos${params}`,
        };
        return Request.fetch(requestData)
    },

});
