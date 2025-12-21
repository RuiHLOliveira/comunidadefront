<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">
        <h1 class="textCenter mb-10">Nova Foto de Projeto</h1>
        <h3 class="textCenter mb-10">
          {{ projeto?.nome }}
        </h3>

        <label v-if="!projeto" for="projeto">Projeto:</label>
        <select v-if="!projeto" class="mb-10 fullSelect" name="categoria" id="situacao"
          v-model="projetoNovoProjetofoto">
          <option v-for="projeto in listaProjetos" :key="projeto.id"
            :value="projeto.id">{{ projeto.nome }}</option>
        </select>
        

        <label for="descricao">Descrição:</label>
        <input name="descricao" :disabled="busy || busyProjetosLoad" type="text" placeholder="descricao" v-model="descricao">
        
        <label for="link">link:</label>
        <input :disabled="busy || busyProjetosLoad" name="link" type="text" placeholder="link" v-model="link">

        <button :disabled="busy || busyProjetosLoad" class="btn btn-wider btn-red" @click="fecharModal()">Fechar</button>
        <button :disabled="busy || busyProjetosLoad" class="btn btn-wider" @click="criarProjetofoto()">Salvar</button>
        
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
      projetofoto: {},
      busy: false,
      needReload: false,
      descricao: '',
      motivo: '',
      hora: '',
      configuracoes: [],
      exibeProjetoSemana: false,
      projetofotoCriado: [],
      listaProjetos: [],
      busyProjetosLoad: false,
      projetoNovoProjetofoto: {},
    }
  },
  emits: [
    'reloadListaProjetosHabitTracker',
    'createdProjetofotoEvent'
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
      this.projetofoto = {};
    },
    
    fecharModal() {
      this.$emit('update:exibirModal', this.exibirModalLocal)
      if(this.needReload == true) {
        console.log('reload');
        this.$emit('reloadListaProjetosHabitTracker', [])
        this.$emit('createdProjetofotoEvent', this.projetofotoCriado)
        this.resetFields();
      }
    },

    /**
     * APIS FETCH
     */
    criarProjetofoto() {
      this.busy = true;

      let body = {
        'descricao': this.descricao,
        'link': this.link,
      };

      console.log('this.projeto',this.projeto);
      console.log('this.projetoNovoProjetofoto',this.projetoNovoProjetofoto);
      if(this.projeto == null || this.projeto == undefined) {
        body['projeto'] = this.projetoNovoProjetofoto
      } else {
        body['projeto'] = this.projeto.id
      }

      let requestData = {
        'url': config.serverUrl + '/projetosfotos',
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Projetofoto criado!')
        this.busy = false;
        this.needReload = true;
        this.projetofotoCriado = data;
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
  },
  created () {
    // this.buscaConfiguracoes();
  },
}
</script>

