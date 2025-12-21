<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">
        <h1>Nova Item</h1>

        <label for="link">Link:</label>
        <input name="link" :disabled="busy" type="text" placeholder="link" v-model="inboxItem.link">

        <label for="nome">nome:</label>
        <input name="nome" :disabled="busy" type="text" placeholder="nome" v-model="inboxItem.nome">
        
        <button :disabled="busy" class="btn btn-wider btn-red" @click="fecharModal()">Fechar</button>
        <button :disabled="busy" class="btn btn-wider" @click="criarinboxItem()">Salvar</button>
        
        <InlineLoader :busy="busy"></InlineLoader>
      </div>
    </div>
    <Notifier ref="notifier"></Notifier>
  </div>
</Teleport>
</template>

<script>
import DateTime from '@/core/DateTime.js'
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
      inboxItem: {},
      busy: false,
      needReload: false,
      hora: '',
      configuracoes: [],
    }
  },
  emits: ['reloadListaInboxItem'],
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

    /**
     * CONTROLES DE TELA
     */
    resetFields(needReload = false){
      this.needReload = needReload;
      this.inboxItem = {};
    },
    
    fecharModal() {
      this.$emit('update:exibirModal', this.exibirModalLocal)
      if(this.needReload == true) {
        console.log('reload');
        this.$emit('reloadListaInboxItem', [])
        this.resetFields();
      }
    },

    /**
     * APIS FETCH
     */
    criarinboxItem() {
      this.busy = true;
      let body = {
        'link': this.inboxItem.link ?? '',
        'nome': this.inboxItem.nome ?? '',
      };
      console.log('body', body);
      

      let requestData = {
        'url': config.serverUrl + '/inboxItems', //config.serverUrl + `/api/${this.localNote.notebook.id}/notes`;
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('inboxItem criada!')
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
    hora(newProp, oldProp) {
      // this.horaLocal = deepCopy.deepCopy(newProp);
    }
  },
  created () {
    // this.buscaConfiguracoes();
  },
}
</script>

