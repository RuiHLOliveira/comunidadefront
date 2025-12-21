<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">

        <section>
          <h1 class="textCenter mb-10">Editar Tarefa</h1>

          <div class="flex-wrap my-5 inputlikeDiv">
            <div class="verticalalign-center mr-10">
              Projeto:
            </div>
            <div>
              <h3>{{ projeto.nome }}</h3>
            </div>
          </div>

          <!-- <div class="flex-wrap mb-5 inputlikeDiv">
            <div class="verticalalign-center mr-10">
              Tarefa:
            </div>
            <div>
              <h3>{{ tarefa.descricao }}</h3>
            </div>
          </div> -->

          <!-- <div class="flex-wrap mb-5 inputlikeDiv">
            <div class="verticalalign-center mr-10">
              Motivo:
            </div>
            <div>
              <h3>{{ tarefa.motivo }}</h3>
            </div>
          </div> -->

          
          <!-- <div class="flex-wrap mb-5 inputlikeDiv">
            <div class="verticalalign-center mr-10">
              Data e Hora:
            </div>
            <div>
              <h3>{{ tarefa.datahoraFormatted != null ? `${tarefa.datahoraWeekday}, ${tarefa.datahoraFormatted}` : '' }}</h3>
            </div>
          </div> -->

          <div class="flex-wrap mb-10">
            <div class="inputlikeDiv">
              Prioridade: 
              <span class="verticalalign-center mr-10 iconBig" v-if="tarefa.meuDia !== null && tarefa.meuDiaHoje">
                <i class="fi fi-sr-parking"></i>
              </span>
              <span class="verticalalign-center mr-10 iconBig" v-if="tarefa.meuDia !== null && !tarefa.meuDiaHoje">
                <i class="fi fi-rr-parking"></i>
              </span>
            </div>
            <div class="inputlikeDiv">
              Finalizada: 
              <span class="verticalalign-center mr-10 check-pendente" v-if="tarefa.situacao == 0"><i class="fi fi-sr-square"></i></span>
              <span class="verticalalign-center mr-10 check-concluido" v-if="tarefa.situacao == 1"><i class="fi fi-sr-checkbox"></i></span>
              <span class="verticalalign-center mr-10 check-falhado" v-if="tarefa.situacao == 2"><i class="fi fi-sr-square-x"></i></span>
            </div>
            <div class="inputlikeDiv verticalalign-center mr-10">
              Situação: {{ tarefa.situacaoDescritivo }}
            </div>
            <div class="verticalalign-center">
              <button :disabled="busy" class="btn btn-sm btn-clear iconBig" @click="excluirTarefa()">
                  <i class="fi fi-br-trash"></i> Excluir
              </button>
            </div>
          </div>
          
          <br>

          <label for="tarefa">Tarefa:</label>
          <input :disabled="busy" name="tarefa" type="text" placeholder="tarefa" v-model="tarefaLocal.descricao">
          
          <label for="motivo">Motivo:</label>
          <input :disabled="busy" name="motivo" type="text" placeholder="motivo" v-model="tarefaLocal.motivo">

          <br>

          <label for="data">data: [{{ tarefa.datahoraFormatted != null ? `${tarefa.datahoraWeekday}, ${tarefa.datahoraFormatted}` : '' }}]</label>
          <input name="data" :disabled="busy || busyProjetosLoad" type="date" placeholder="data" v-model="data">

          <label for="hora">hora:</label>
          <input name="hora" :disabled="busy || busyProjetosLoad" type="time" placeholder="hora" v-model="hora">
          
          <br>
          
          <button class="btn btn-sm btn-clear" @click="zerarDataHora()">
            Apagar Data e Hora
          </button>

          <button class="btn btn-sm btn-clear" @click="reagendarDiaSeguinte()">
            Reagendar para dia seguinte
          </button>

        </section>
        <br>
        <section class="flex-justify-space-between">
          <div>
            <button :disabled="busy" class="btn btn-clear iconBig mr-10" @click="fecharModal()">
              <i class="fi fi-br-left" ></i> Fechar
            </button>
            <button :disabled="busy" class="btn btn-clear iconBig ml-10" @click="editarTarefa()">
              <i class="fi fi-br-disk"></i> Salvar
            </button>
          </div>
          <div v-if="tarefaLocal.situacao == 0">
            <button :disabled="busy" class="btn btn-clear iconBig" @click="concluirTarefa()">
                <i class="fi fi-br-checkbox"></i> Concluir
            </button>
          </div>

        </section>

        <br>

        <!-- <div class="mt-15" v-if="tarefaLocal.situacao == 0">
          <h2 class="mb-5">Prioridade</h2>
          <div v-if="!tarefa.meuDia">
            <button :disabled="busy" class="btn btn-clear iconBig" @click="adicionarAoMeuDiaTarefa()">
              <i class="fi fi-sr-parking"></i> Definir como Prioridade
            </button>
          </div>
          <div v-if="tarefa.meuDia">
            <button :disabled="busy" class="btn btn-clear iconBig mr-10" @click="removerMeuDiaTarefa()">
              <i class="fi fi-br-parking"></i> Retirar Prioridade
            </button>
            <button :disabled="true" class="btn btn-clear iconBig ml-10" @click="recolocarMeuDiaTarefa()">
              <i class="fi fi-br-parking"></i> Reaplicar Prioridade - pend
            </button>
          </div>
        </div> -->
        <InlineLoader :busy="busy"></InlineLoader>

      </div>
    </div>
    <Notifier ref="notifier"></Notifier>
  </div>
</Teleport>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import deepCopy from '@/core/deepcopy.js';
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import Request from '@/core/request.js'
import config from '@/core/config.js'

export default {
  components: {
    InlineLoader,
    Notifier
  },
  data: function () {
    return {
      tarefaLocal: [],
      busy: false,
      needReload: false,
      tarefaExcluida: false,
      configuracoes: [],
      exibeProjetoSemana: false,
      data: [],
      hora: [],
    }
  },
  emits: ['reloadListaProjetosHabitTracker','update:exibirModal','updateTaskEvent'],
  props: {
    exibirModal: Boolean,
    tarefa: Object,
    projeto: Object
  },
  methods: {
    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDateTime(dateObject){return DateTime.formatDevDateTime(dateObject);},
    formatBrDateTime(dateObject){return DateTime.formatBrDateTime(dateObject);},
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},
    
    /**
     * CONTROLES DE TELA
     */

    zerarDataHora(){
      this.data = null;
      this.hora = null;
    },

    fecharModal() {
      this.$emit('update:exibirModal', this.exibirModalLocal)
      console.log('this.needReload',this.needReload);
      if(this.needReload == true) {
        console.log('reload');
        this.$emit('reloadListaProjetosHabitTracker', []);
        this.$emit('updateTaskEvent', this.tarefaLocal);
        this.needReload = false; // reset
      }
      if(this.tarefaExcluida == true) {
        console.info('tarefa excluida, recarregar');
        this.$emit('deletedTaskEvent', this.tarefaLocal);
        this.tarefaExcluida = false
      }
    },

    formHasValidDate(){
      return ( this.data != null && this.data != '' && this.hora != null && this.hora != '' );
    },

    /**
     * APIS FETCH
     */
    editarTarefa() {
      this.busy = true;
      let body = {
        'descricao': this.tarefaLocal.descricao,
        'motivo': this.tarefaLocal.motivo,
        'datahora': null,
      };

      if(this.formHasValidDate()) {
        body['datahora'] = this.data + ' ' + this.hora
      }
      console.log('body', body);

      let requestData = {
        'url': config.serverUrl + '/tarefas/' + this.tarefa.id,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Tarefa editada!')
        this.busy = false;
        this.needReload = true;
        this.fillDataHoraPosAtualizacao();
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    excluirTarefa() {
      // ask for confirmation
      if(!confirm("Deseja apagar a tarefa?")){
        return;
      }
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + '/tarefas/' + this.tarefa.id,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'DELETE',
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Tarefa excluída!')
        this.busy = false;
        this.needReload = true;
        this.tarefaExcluida = true;
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    fillDataHoraPosAtualizacao(){
      this.tarefaLocal.datahora = null;
      this.tarefaLocal.datahoraFormatted = null;
      this.tarefaLocal.datahoraWeekday = null;
      if(this.formHasValidDate()) {
        let datetimeObject = new Date(this.data + ' ' + this.hora);
        this.tarefaLocal.datahora = this.formatDevDateTime(datetimeObject);
        this.tarefaLocal.datahoraFormatted = this.formatBrDateTime(datetimeObject);
        this.tarefaLocal.datahoraWeekday = this.getWeekDay(datetimeObject);
      }
    },

    // adicionarAoMeuDiaTarefa() {
    //   this.busy = true;
    //   let requestData = {
    //     'url': config.serverUrl + '/tarefas/' + this.tarefa.id + '/meu-dia',
    //     'headers': new Headers({'Content-Type': 'application/json'}),
    //     'method' : 'POST',
    //   };
    //   Request.fetch(requestData).then(([response, data]) => {
    //     this.$refs.notifier.notify('Tarefa adicionada ao Meu Dia')
    //     this.busy = false;
    //     this.needReload = true;
    //     this.tarefaLocal.meuDia = data.meuDia
    //     this.tarefaLocal.meuDiaObj = data.meuDiaObj
    //     this.tarefa.meuDia = data.meuDia
    //     this.tarefa.meuDiaObj = data.meuDiaObj
    //   }).catch((error) => {
    //     console.error(error);
    //     this.busy = false;
    //     this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
    //   });
    // },
    // removerMeuDiaTarefa() {
    //   this.busy = true;
    //   let requestData = {
    //     'url': config.serverUrl + '/tarefas/' + this.tarefa.id + '/remover-meu-dia',
    //     'headers': new Headers({'Content-Type': 'application/json'}),
    //     'method' : 'POST',
    //   };
    //   Request.fetch(requestData).then(([response, data]) => {
    //     this.$refs.notifier.notify('Tarefa adicionada ao Meu Dia')
    //     this.busy = false;
    //     this.needReload = true;
    //     this.tarefaLocal.meuDia = data.meuDia
    //     this.tarefaLocal.meuDiaObj = data.meuDiaObj
    //     this.tarefa.meuDia = data.meuDia
    //     this.tarefa.meuDiaObj = data.meuDiaObj
    //   }).catch((error) => {
    //     console.error(error);
    //     this.busy = false;
    //     this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
    //   });
    // },

    concluirTarefa() {
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + '/tarefas/' + this.tarefa.id + '/concluir',
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Tarefa alterada para "concluída!"')
        this.busy = false;
        this.needReload = true;
        this.tarefaLocal.situacao = 1
        this.tarefa.situacao = 1
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    reagendarDiaSeguinte() {
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + '/tarefas/' + this.tarefa.id + '/reagendar-dia-seguinte',
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
      };
      Request.fetch(requestData).then(([response, data]) => {
        console.info('dados retornados', data);
        this.$refs.notifier.notify('Tarefa reagendada para dia seguinte')
        this.busy = false;
        this.needReload = true;
        this.tarefaLocal.datahora = data.datahora;
        this.tarefa.datahora = data.datahora;
        this.processaDataHoraParaForm();
        this.fillDataHoraPosAtualizacao();
        // this.tarefaLocal.situacao = 2
        // this.tarefa.situacao = 2
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    processaDataHoraParaForm()
    {
      console.log('this.tarefaLocal.datahora',this.tarefaLocal.datahora);
      if(this.tarefaLocal.datahora != null && this.tarefaLocal.datahora != '') {
        let array = this.tarefaLocal.datahora.split(" ");
        console.log('array', array)
        this.data = array[0];
        this.hora = array[1];
      }
    },

  },
  watch: {
    exibirModal(newProp, oldProp) {
      // this.exibirModalLocal = newProp;
    },
    tarefa(newProp, oldProp) {
      this.tarefaLocal = deepCopy.deepCopy(newProp);
      this.processaDataHoraParaForm();
    }
  },
  created () {
    // this.buscaConfiguracoes();
  },
}
</script>

