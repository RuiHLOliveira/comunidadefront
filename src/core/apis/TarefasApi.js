


import Request from '@/core/request.js'
import config from '@/core/config.js'

export default {
  updatePrioridade(tarefa, prioridade)
  {
    let body = {
      'prioridade': prioridade,
    };
    let requestData = {
      'url': config.serverUrl + '/tarefas/' + tarefa.id + '/prioridade',
      'headers': new Headers({'Content-Type': 'application/json'}),
      'method' : 'PUT',
      'data' : body
    };
    return Request.fetch(requestData);
  },
}
