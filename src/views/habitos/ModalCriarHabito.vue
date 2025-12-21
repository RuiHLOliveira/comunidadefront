<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">
        <h1>Criar novo hábito</h1>

        <label for="descricao">descricao:</label>
        <input name="descricao" :disabled="busy" type="text" placeholder="descricao" v-model="descricao">

        <label for="motivo">motivo:</label>
        <input name="motivo" :disabled="busy" type="text" placeholder="motivo" v-model="motivo">
        
        <label for="hora">Hora:</label>
        <input name="hora" :disabled="busy" type="time" placeholder="hora" v-model="hora">

        <button :disabled="busy" class="btn btn-wider btn-red" @click="fecharModal()">
          Fechar
        </button>
        <button :disabled="busy" class="btn btn-wider" @click="criarHabito()">
          Salvar
          <InlineLoader :busy="busy"></InlineLoader>
        </button>

      </div>
    </div>
    <Notifier ref="notifier"></Notifier>
  </div>
</Teleport>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import deepCopy from '@/core/deepcopy.js';
import Loader from '@/components/Loader.vue';
import Request from '@/core/request.js';
import config from '@/core/config.js'
import Notifier from '@/components/Notifier.vue';
import InlineLoader from '@/components/InlineLoader.vue';

export default {
  components: {
    Loader,
    InlineLoader,
    Notifier
  },
  data: function () {
    return {
      descricao: '',
      motivo: '',
      hora: '',
      busy: false,
      needReload: false,
      // showNotify: false,
      // notifyMessage: '',
    }
  },
  emits: ['reloadListaHabitosHabitTracker'],
  props: {
    exibirModal: Boolean,
  },
  methods: {
    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},

    // notify(message, type = 'success'){
    //     this.showNotify = true;
    //     this.notifyMessage = message;
    // },
    resetFields(needReload = false){
        this.needReload = needReload;
        this.nome = '';
        this.hora = '';
    },
    fecharModal() {
      this.$emit('update:exibirModal', false)
      if(this.needReload == true) {
        console.log('reload');
        this.$emit('reloadListaHabitosHabitTracker', [])
        this.resetFields();
      }
    },
    criarHabito() {
      this.busy = true;
      let body = {
        'descricao': this.descricao,
        'motivo': this.motivo,
        'hora': this.hora
      };
      let requestData = {
        'url': config.serverUrl + '/habitos', //config.serverUrl + `/api/${this.localNote.notebook.id}/notes`;
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Habito criada!')
        this.busy = false;
        this.needReload = true;
        this.resetFields(true);
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

