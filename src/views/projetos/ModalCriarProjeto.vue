<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">
        <h1>Criar novo projeto</h1>

        <label for="nome">nome:</label>
        <input name="nome" type="text" placeholder="nome" v-model="nome">

        <div class="marginVerticalSpacer">
          <button type="button" class="btn btn-sm btnPrioridade mr-5 prioridadeUrgente"
            :class="{selected : prioridade == 1}"
            @click="togglePrioridade(1)">
            1-Urgente
          </button>
          <button type="button" class="btn btn-sm btnPrioridade mr-5 prioridadeAlta"
            :class="{selected : prioridade == 2}"
            @click="togglePrioridade(2)">
            2-Alta
          </button>
          <button type="button" class="btn btn-sm btnPrioridade mr-5 prioridadeMedia"
            :class="{selected : prioridade == 3}"
            @click="togglePrioridade(3)">
            3-Media
          </button>
          <button type="button" class="btn btn-sm btnPrioridade mr-5 prioridadeBaixa"
            :class="{selected : prioridade == 4}"
            @click="togglePrioridade(4)">
            4-Baixa
          </button>
          <button type="button" class="btn btn-sm btnPrioridade mr-5 prioridadeBaixissima"
            :class="{selected : prioridade == 5}"
            @click="togglePrioridade(5)">
            5-Baixissima
          </button>
        </div>

        <label for="dataPrazo">Data Prazo:</label>
        <input name="dataPrazo" type="date" placeholder="nome" v-model="dataPrazo">
        
        <label for="anotacoes">Anotações:</label>
        <br>
        <textarea class="textarea textareaHeight150" rows="4" cols="80" name="anotacoes" placeholder="anotacoes" v-model="anotacoes"></textarea>
        <br>
        <br>

        <button @click="fecharModal()">Fechar</button>
        <button @click="criarProjeto()">Criar projeto</button>
      </div>
    </div>
    <Loader :busy="busy"></Loader>
    <Notifier ref="notifier"></Notifier>
  </div>
</Teleport>
</template>

<script>
import deepCopy from '@/core/deepcopy.js';
import Loader from '@/components/Loader.vue';
import Request from '@/core/request.js';
import config from '@/core/config.js'
import Notifier from '@/components/Notifier.vue';

export default {
  components: {
    Loader,
    Notifier
  },
  data: function () {
    return {
      nome: '',
      prioridade: 5,
      dataPrazo: {},
      anotacoes: '',
      busy: false,
      needReload: false,
      // showNotify: false,
      // notifyMessage: '',
    }
  },
  emits: ['reloadListaProjetosHabitTracker'],
  props: {
    exibirModal: Boolean,
  },
  methods: {
    // notify(message, type = 'success'){
    //     this.showNotify = true;
    //     this.notifyMessage = message;
    // },
    resetFields(needReload = false){
        this.needReload = needReload;
        this.busy = false;
        this.dataPrazo = '';
        this.nome = '';
        this.anotacoes = '';
    },
    togglePrioridade(prioridade){
      this.prioridade = prioridade
    },
    fecharModal() {
      this.$emit('update:exibirModal', false)
      if(this.needReload == true) {
        console.log('reload');
        this.$emit('reloadListaProjetosHabitTracker', [])
      }
      this.resetFields();
    },
    criarProjeto() {
      let dataPrazoEnvio = this.dataPrazo
      if(typeof dataPrazoEnvio == 'object') {
        dataPrazoEnvio = '';
      }

      this.busy = true;
      let body = {
        'dataPrazo': dataPrazoEnvio,
        'nome': this.nome,
        'anotacoes': this.anotacoes,
        'prioridade': this.prioridade
      };

      let requestData = {
        'url': config.serverUrl + '/projetos',
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.busy = false;
        this.resetFields(true)
        this.$refs.notifier.notify('Projeto criado!') //this.notify('Projeto criado!');
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify('Ocorreu um erro.' + error);
      });
    },
  },
  watch: {
    exibirModal(newProp, oldProp) {
      // this.exibirModalLocal = newProp;
    },
  }
}
</script>

