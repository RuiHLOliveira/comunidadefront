<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">

        <section>
          <h1>Editar Foto no Projeto</h1>

          <div class="flex-wrap">
            <div class="verticalalign-center mr-10">
              Projeto:
            </div>
            <div>
              <h3>{{ projeto.nome }}</h3>
            </div>
          </div>

          <div class="flex-wrap">
            <div class="verticalalign-center mr-10">
              Descrição:
            </div>
            <div>
              <h3>{{ projetofoto.descricao }}</h3>
            </div>
          </div>

          <div class="flex-wrap">
            <div class="verticalalign-center mr-10">
              Link:
            </div>
            <div>
              <h3>{{ projetofoto.link }}</h3>
            </div>
          </div>

          <div class="flex-wrap">
            
            <label for="descricao">Descricao:</label>
            <input :disabled="busy" name="descricao" type="text" placeholder="descricao" v-model="projetofotoLocal.descricao">
            
            <label for="link">link:</label>
            <input :disabled="busy" name="link" type="text" placeholder="link" v-model="projetofotoLocal.link">
          </div>

        </section>

        <div class="mt-15">
          <h3 class="mb-5">Salvar?</h3>
          <section class="my-15 flex-justify-space-between">
            <div>
              <button :disabled="busy" class="btn btn-wider btn-red" @click="fecharModal()">Fechar</button>
              <button :disabled="busy" class="btn btn-wider" @click="editarProjetofoto()">Salvar</button>
            </div>
            <div>
              <button :disabled="busy" class="btn btn-wider" @click="excluirProjetofoto()">EXCLUIR</button>
            </div>
          </section>
        </div>

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
      projetofotoLocal: [],
      busy: false,
      needReload: false,
      configuracoes: [],
      exibeProjetoSemana: false
    }
  },
  emits: ['reloadListaProjetosHabitTracker','update:exibirModal','updatedProjetofotoEvent'],
  props: {
    exibirModal: Boolean,
    projetofoto: Object,
    projeto: Object
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
    },

    fecharModal() {
      this.$emit('update:exibirModal', this.exibirModalLocal)
      console.log('this.needReload',this.needReload);
      if(this.needReload == true) {
        console.log('reload');
        this.$emit('reloadListaProjetosHabitTracker', []);
        this.$emit('updatedProjetofotoEvent', this.projetofotoLocal)
        this.resetFields();
      }
    },

    /**
     * APIS FETCH
     */
    editarProjetofoto() {
      this.busy = true;
      let body = {
        'descricao': this.projetofotoLocal.descricao,
        'link': this.projetofotoLocal.link,
      };
      let requestData = {
        'url': config.serverUrl + '/projetosfotos/' + this.projetofoto.id,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Projeto foto editado!')
        this.busy = false;
        this.resetFields(true);
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    excluirProjetofoto() {
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + '/projetosfotos/' + this.projetofoto.id,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'DELETE',
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Projeto foto excluido!')
        this.busy = false;
        this.resetFields(true);
        this.projetofotoLocal.excluido = true;
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

  },
  watch: {
    exibirModal(newProp, oldProp) {
      // this.exibirModalLocal = newProp;
    },
    projetofoto(newProp, oldProp) {
      this.projetofotoLocal = deepCopy.deepCopy(newProp);
    }
  },
  created () {
    // this.buscaConfiguracoes();
  },
}
</script>

