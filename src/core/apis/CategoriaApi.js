
import Request from '@/core/request.js'
import config from '@/core/config.js'

export default {
  criarCategoria(novaCategoria) {
    let body = {
      'categoria': novaCategoria,
    };
    let requestData = {
      'url': config.serverUrl + '/categoriaItems',
      'headers': new Headers({ 'Content-Type': 'application/json' }),
      'method': 'POST',
      'data': body
    };
    return Request.fetch(requestData);
  },
  loadListaCategorias(orderBy = []) {
    let url = config.serverUrl + '/categoriaItems';
    if(orderBy.length > 0){
        url += '?orderBy='+orderBy[0]
    }
    let requestData = {
      'url': url,
      'headers': new Headers({ 'Content-Type': 'application/json' }),
      'method': 'GET',
    };
    return Request.fetch(requestData);
  },

}
