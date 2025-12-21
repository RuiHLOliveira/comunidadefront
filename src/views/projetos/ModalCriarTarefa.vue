<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">
        <h1 class="textCenter mb-10">Nova Tarefa</h1>
        
        <h3 class="textCenter mb-10">
          Projeto: {{ projeto?.nome }}
        </h3>

        <label v-if="!projeto" for="projeto">Projeto:</label>
        <select v-if="!projeto" class="mb-10 fullSelect" name="categoria" id="situacao"
          v-model="projetoNovaTarefa">
          <option v-for="projeto in listaProjetos" :key="projeto.id"
            :value="projeto.id">{{ projeto.nome }}</option>
        </select>
        

        <label for="tarefa">Tarefa:</label>
        <input name="tarefa" :disabled="busy || busyProjetosLoad" type="text" placeholder="tarefa" v-model="descricao">
        
        <label for="motivo">Motivo:</label>
        <input :disabled="busy || busyProjetosLoad" name="motivo" type="text" placeholder="motivo" v-model="motivo">

        <label for="data">data:</label>
        <input name="data" :disabled="busy || busyProjetosLoad" type="date" placeholder="data" v-model="data">

        <label for="hora">hora:</label>
        <input name="hora" :disabled="busy || busyProjetosLoad" type="time" placeholder="hora" v-model="hora">

        <br>
        <div class="mt-10">
          <button :disabled="busy || busyProjetosLoad" class="btn iconBig mr-10" @click="fecharModal()">
            <i class="fi fi-br-left" ></i> Fechar
          </button>
          <button :disabled="busy || busyProjetosLoad" class="btn iconBig mr-10" @click="criarTarefa()">
            <i class="fi fi-br-disk"></i> Salvar
          </button>
        </div>
        
        <InlineLoader :busy="busy || busyProjetosLoad"></InlineLoader>
      </div>
    </div>
    <Notifier ref="notifier"></Notifier>
  </div>
</Teleport>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import QueryStringConverter from '@/core/QueryStringConverter.js'
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import Request from '@/core/request.js';
import config from '@/core/config.js'

export default {
  components: {
    InlineLoader,
    Notifier
  },
  data: function () {
    return {
      tarefa: {},
      busy: false,
      needReload: false,
      descricao: '',
      motivo: '',
      data: '',
      hora: '',
      configuracoes: [],
      exibeProjetoSemana: false,
      tarefaCriada: [],
      listaProjetos: [],
      busyProjetosLoad: false,
      projetoNovaTarefa: {},
    }
  },
  emits: [
    'reloadListaProjetosHabitTracker',
    'updateTaskEvent'
  ],
  props: {
    exibirModal: Boolean,
    projeto: Object,
  },
  methods: {

    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},

    /**
     * CONTROLES DE TELA
     */
    resetFields(needReload = false){
      this.needReload = needReload;
      this.tarefa = {};
    },
    
    fecharModal() {
      this.$emit('update:exibirModal', this.exibirModalLocal)
      if(this.needReload == true) {
        console.log('reload');
        this.$emit('reloadListaProjetosHabitTracker', [])
        this.$emit('updateTaskEvent', this.tarefaCriada)
        this.resetFields();
      }
    },

    /**
     * APIS FETCH
     */
    criarTarefa() {
      this.busy = true;

      let body = {
        'descricao': this.descricao,
        'motivo': this.motivo,
        'datahora': null,
      };
      
      if( this.data != null && this.data != '' && this.hora != null && this.hora != '') {
        body['datahora'] = this.data + ' ' + this.hora
      }

      console.log('body', body);

      console.log('this.projeto',this.projeto);
      console.log('this.projetoNovaTarefa',this.projetoNovaTarefa);
      if(this.projeto == null || this.projeto == undefined) {
        body['projeto'] = this.projetoNovaTarefa
      } else {
        body['projeto'] = this.projeto.id
      }

      let requestData = {
        'url': config.serverUrl + '/tarefas', //config.serverUrl + `/api/${this.localNote.notebook.id}/notes`;
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Tarefa criada!') //this.notify('Tarefa criada!');
        this.busy = false;
        this.needReload = true;
        this.tarefaCriada = data;
        this.resetFields(true);
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify('Ocorreu um erro.' + error);
      });
    },

    listarProjetos () {
      this.busyProjetosLoad = true;
      let params = {};
      params['loadTarefas'] = false;
      params['orderBy'] = 'nome,asc'
      params = QueryStringConverter.toQueryString(params, true);
      let requestData = {
        'url': `${config.serverUrl}/projetos${params}`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        console.log({data});
        // data = this.projetosFillAdditionalProps(data)
        // data = this.projetosTarefasFillAdditionalProps(data)
        // data = this.projetosTarefasOrganizar(data)
        this.listaProjetos = data
        // this.projetoBackup = this.projetos
        this.busyProjetosLoad = false;
      })
      .catch((error) => {
        this.busyProjetosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },
    
    // projetosFillAdditionalProps(projetos) {
    //   for (let i = 0; i < projetos.length; i++) {
    //     projetos[i].nomeEditar = projetos[i].nome;
    //     projetos[i].anotacoesEditar = projetos[i].anotacoes;
    //     projetos[i].prioridadeEditar = projetos[i].prioridade;
    //     projetos[i].situacaoEditar = projetos[i].situacao;
    //     projetos[i].editMode = false;
    //     projetos[i].selected = false;
    //   }
    //   return projetos;
    // },
    
    // projetosTarefasFillAdditionalProps(projetos){
    //   let dateHoje = new Date();
    //   for (let i = 0; i < projetos.length; i++) {
    //     for (let j = 0; j < projetos[i].tarefas.length; j++) {
    //       let dateMeuDia = this.newDatetimeTz(projetos[i].tarefas[j].meuDia);
    //       let tarefaDeHoje = this.isSameYMD(dateMeuDia, dateHoje);
    //       if(tarefaDeHoje){
    //         projetos[i].tarefas[j].meuDiaHoje = true;
    //       }
    //     }
    //   }
    //   return projetos;
    // },
    
    // projetosTarefasOrganizar(projetos){
    //   let dateHoje = new Date();
    //   for (let i = 0; i < projetos.length; i++) {
    //     let tarefasPendentes = [];
    //     let tarefasConcluidas = [];
    //     for (let j = 0; j < projetos[i].tarefas.length; j++) {
    //       if(projetos[i].tarefas[j].situacao == 1 || projetos[i].tarefas[j].situacao == 2){
    //         tarefasConcluidas.push(projetos[i].tarefas[j])
    //       } else {
    //         tarefasPendentes.push(projetos[i].tarefas[j])
    //       }
    //     }
    //     tarefasPendentes.push(...tarefasConcluidas);
    //     projetos[i].tarefas = tarefasPendentes
    //   }
    //   return projetos;
    // },
    
  },
  watch: {
    exibirModal(newProp, oldProp) {
      // this.exibirModalLocal = newProp;
      if(this.projeto == undefined){
        this.listarProjetos();
      }
    },
    datahora(newProp, oldProp) {
      // this.horaLocal = deepCopy.deepCopy(newProp);
    },
  },
  created () {
    // this.buscaConfiguracoes();
  },
}
</script>

