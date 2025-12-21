<style scoped>
.modalAdditionalTag {
    font-size: 0.8rem;
    color: var(--darkmode-font-color);
    background-color: var(--darkmode-bg-color);
    border-radius: 5px;
}
.modalInboxItem {
  border-radius: 5px;
    color: var(--darkmode-font-color);
    background-color: #252525;
}
a.link{
  color: #116dc8;
}
a.link:visited {
  color: #116dc8;
}
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal" class="modalBackground">
    <div class="modal">

      <section>
        <h1>InboxItem - Edição</h1>

        <div class="modalInboxItem p-10 mt-10">
          <!-- <div class="mt-5">
            <span>{{ inboxItemLocal.nome }}</span>
          </div> -->
          
          <div class="mt-5">
            <span v-html="inboxItemLocal.linkTag"></span>
          </div>
          
          <div class="mt-5 mb-5">
            <span class=" m-5 p-5 modalAdditionalTag">{{ inboxItemLocal.categoriaItem?.categoria ?? '-' }}</span>
            <span class=" m-5 p-5 modalAdditionalTag">{{ inboxItemLocal.origemDescritivo }}</span>
          </div>
        </div>

        <div>
          <!-- <h1>Edição</h1> -->

          <div class="mt-15">
            <label for="nome">Nome:</label>
            <input :disabled="busyEditarItem" name="nome" type="text" placeholder="nome" v-model="inboxItemLocal.nome">
          </div>

          <div class="mt-15">
            <label for="link">Link:</label>
            <input :disabled="busyEditarItem" name="link" type="text" placeholder="link" v-model="inboxItemLocal.link">
          </div>
          
          <div class="mt-15 pt-10">
            <div>
              <label for="categoria">Categoria:</label>
            </div>
            
            <button type="button" class="mb-10 btn btn-clear btn-sm" @click="toggleCriarCategoria()">
              <span v-if="showCriarCategoria">
                <i class="fi fi-rr-up" ></i> Selecionar Categoria
              </span>
              <span v-if="!showCriarCategoria">
                <i class="fi fi-rr-down" ></i> Criar Nova Categoria
              </span>
            </button>

            <div v-if="showCriarCategoria" class="modalInboxItem mb-10 p-10">
              <label for="nome">Nova categoria:</label>
              <input :disabled="busyCriarCategoria" name="nome" type="text" placeholder="nome" v-model="novaCategoria">
              <button :disabled="busyCriarCategoria" type="button" class="my-5 btn btn-clear btn-sm" @click="criarCategoria()">
                <i class="fi fi-rr-check-circle"></i> Criar Categoria
              </button>
              
              <InlineLoader
                :textoAguarde="true"
                :busy="busyCriarCategoria"
                :center="false">
              </InlineLoader>
            </div>

            <select v-if="inboxItemLocal.categoriaItem != null && !showCriarCategoria"
              class="mb-10 fullSelect" name="categoria" id="situacao"
              v-model="inboxItemLocal.categoriaItem.id">
              <option v-for="listaCategoria in listaCategorias" :key="listaCategoria.id"
                :value="listaCategoria.id">{{ listaCategoria.categoria }}</option>
            </select>

          </div>

          <div class="mt-15">
            <label for="acao">Ação:</label>
            <textarea class="textarea textareaHeight150" name="anotacoes" placeholder="Ação" :disabled="busyEditarItem" v-model="inboxItemLocal.acao"></textarea>
          </div>

        </div>
      </section>

      <section class="flex-justify-space-between mt-30 pt-30">
        <div>
          <button :disabled="busyEditarItem" class="mr-10 btn btn-clear iconBig" @click="fecharModal()">
            <i class="fi fi-br-left" ></i> Fechar
          </button>
          <button :disabled="busyEditarItem" class="mr-10 btn btn-clear iconBig" @click="editarInboxItem()">
            <i class="fi fi-br-disk"></i> Salvar
          </button>
        </div>
        <div>
          <button :disabled="busyEditarItem" class="btn btn-clear iconBig" @click="excluirInboxItem()">
            <i class="fi fi-br-trash"></i> Excluir
          </button>
        </div>
      </section>
      
      <InlineLoader
        :textoAguarde="true"
        :busy="busyEditarItem"
        :center="true">
      </InlineLoader>

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
import CategoriaApi from '@/core/apis/CategoriaApi.js'

export default {
  components: {
    InlineLoader,
    Notifier
  },
  data: function () {
    return {
      inboxItemLocal: {},
      busyEditarItem: false,
      busyCriarCategoria: false,
      needReload: false,
      showCriarCategoria: false,
      configuracoes: [],
      listaCategorias: [],
      listaOrigens: [],
      novaCategoria: [],
    }
  },
  emits: ['reloadListaInboxItem','update:exibirModal'],
  props: {
    exibirModal: Boolean,
    inboxItem: Object,
  },
  methods: {
    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},
    
    toggleCriarCategoria(){
      this.showCriarCategoria = !this.showCriarCategoria;
    },

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
        this.$emit('reloadListaInboxItem', []);
        this.resetFields();
      }
    },

    getCategoriaDescricao(categoria) {
      let desc = '';
      this.listaCategorias.forEach(cat => {
        if(cat.id == categoria) desc = cat.categoria
      })
      return desc;
    },

    getOrigemDescricao(origem) {
      let desc = '';
      this.listaOrigens.forEach(or => {
        if(or.id == origem) desc = or.origem
      })
      return desc;
    },
    /**
     * APIS FETCH
     */

    editarInboxItem() {
      this.busyEditarItem = true;
      let body = {
        'nome': this.inboxItemLocal.nome,
        'link': this.inboxItemLocal.link,
        'categoriaItem': this.inboxItemLocal.categoriaItem,
        'acao': this.inboxItemLocal.acao,
      };
      let requestData = {
        'url': config.serverUrl + '/inboxItems/' + this.inboxItem.id,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('InboxItem editada!')
        this.busyEditarItem = false;
        this.resetFields(true);
      }).catch((error) => {
        console.error(error);
        this.busyEditarItem = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    excluirInboxItem() {
      this.busyEditarItem = true;
      let requestData = {
        'url': config.serverUrl + '/inboxItems/' + this.inboxItem.id,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'DELETE',
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('InboxItem excluida!')
        this.busyEditarItem = false;
      }).catch((error) => {
        console.error(error);
        this.busyEditarItem = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    criarCategoria () {
      this.busyCriarCategoria = true;
      CategoriaApi.criarCategoria(this.novaCategoria)
      .then(([response, data]) => {
        console.log('categoria criada', data)
        this.$refs.notifier.notify('Categoria criada!')
        this.busyCriarCategoria = false;
        this.novaCategoria = ''
        this.toggleCriarCategoria();
        this.loadListaCategorias(['categoria,asc'])
      }).catch((error) => {
        this.busyCriarCategoria = false;
        console.error(error)
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    loadListaCategorias()
    {
      this.busyEditarItem = true;
      CategoriaApi.loadListaCategorias(['categoria,asc']).then(([response, data]) => {
        console.log('lista categorias', data)
        this.listaCategorias = data
        this.busyEditarItem = false;
      }).catch((error) => {
        this.busyEditarItem = false;
        console.error(error)
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },
    
    loadListaOrigens(){
      this.listaOrigens = [
        { id: 0, origem: '-'},
        { id: 1, origem: 'Youtube'},
        { id: 2, origem: 'Instagram'},
      ];
    },

  },
  watch: {
    exibirModal(newProp, oldProp) {
    },
    inboxItem(newProp, oldProp) {
      this.inboxItemLocal = deepCopy.deepCopy(newProp);
      if(this.inboxItemLocal.categoriaItem == null) {
        this.inboxItemLocal.categoriaItem = {id: null}
      }
      console.log(this.inboxItemLocal);
    }
  },
  created () {
    this.loadListaCategorias(['categoria,asc']);
    this.loadListaOrigens();
    // this.buscaConfiguracoes();
  },
}
</script>

