<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">
        <h1>Novo Item por lote</h1>

        <label for="link">Lote de Links:</label>

        <textarea :disabled="busy" class="textarea textareaHeight150" name="anotacoes" placeholder="anotacoes" v-model="loteLinks"></textarea>
        
        <button :disabled="busy" class="btn btn-wider btn-red" @click="fecharModal()">Fechar</button>
        <button :disabled="busy" class="btn btn-wider" @click="criarinboxItemLote()">Salvar</button>
        
        <InlineLoader
          :textoAguarde="true"
          :busy="busy"
          :center="true">
        </InlineLoader>

        <div>
          <div v-for="link in links">
            <span v-if="link.link !='' ">{{ link.success }}{{ link.error }} => {{ link.link }}</span>
          </div>
        </div>
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
      loteLinks: '',
      links: [],
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

    criarinboxItemLote() {
      let links = this.loteLinks.split(/\r?\n|\r|\n/g);
      console.log(links);
      
      links.forEach(link => {
        this.links.push({
          'link': link,
          'success': '',
          'error': '',
        })
      });

      this.links.forEach(link => {
        if(link.link == '' || link.link == undefined || link.link == null) return;
        this.criarinboxItem(link)
      });
    },

    /**
     * APIS FETCH
     */
    criarinboxItem(link) {
      this.busy = true;
      let body = {
        'link': link.link ?? '',
        'nome': '',
      };
      console.log('body', body);

      let requestData = {
        'url': config.serverUrl + '/inboxItems', //config.serverUrl + `/api/${this.localNote.notebook.id}/notes`;
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        link.success = "Sucesso!"
        // this.$refs.notifier.notify('inboxItem criada!')
        this.busy = false;
        // this.needReload = true;
        // this.resetFields(true);
      }).catch((error) => {
        console.error(error);
        link.error = error
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

