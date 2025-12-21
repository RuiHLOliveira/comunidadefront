<style>

h1.titulo {

}
.inboxItem {
  /* border-bottom: 2px solid rgb(194, 194, 194); */
  border-radius: 5px;
  background-color: var(--darkmode-bg-color);
  color: var(--darkmode-font-color);
  min-width: 285px;
  max-width: 285px;
}
.inboxItem:hover {
  background-color: var(--darkmode-bg-color);
  color: var(--darkmode-font-color);
  cursor: pointer;
}
.additionalTag {
    font-size: 0.8rem;
    background-color: rgb(51, 51, 51);
    color: var(--darkmode-font-color);
    border-radius: 5px;
}
a.link{
  color: #116dc8;
}
a.link:visited {
  color: #116dc8;
}

</style>

<template>
  <div>
    <div class="container">
      
      <div class="position_sticky darkmodeBgBlack pb-10 div_border_bottom_gray">
        <section class="flex alignitens-center darkmodeBgBlack div_border_gray my-5 py-5 px-10 flex justify-spacebetween">
          <h1 class="titulo">Inbox</h1>
          <div>
            <button class="btn mx-5 btn-sm" type="button" @click="toggleModalCriarInboxItem()">Criar +</button>
            <button class="btn mx-5 btn-sm" type="button" @click="toggleModalCriarInboxItemLote()">Criar Lote</button>
          </div>
        </section>
      </div>

      <!-- CATEGORIAS -->
      <section class="flex-column my-10 p-10 darkmodeBgBlack div_border_gray">
        <div>
          <h3>Categoria: {{ categoriaEscolhida.categoria }}</h3>
        </div>
        <div class="flex-wrap alignitens-center">
          <button class="btn btn-sm m-5" @click="loadInboxItemCategoria(null)" type="button">
            Sem Categoria
          </button>
          <button class="btn btn-sm m-5" @click="loadInboxItemCategoria(categoriaItem)" type="button" v-for="categoriaItem in listaCategorias">
            {{ categoriaItem.categoria }}
          </button>
        </div>
      </section>

      <!-- LOADER -->
      <InlineLoader
        :textoAguarde="true"
        :busy="busyInboxLoad || busyInboxDelete"
        :center="true">
      </InlineLoader>
      
      <ModalCriarInboxItem
        v-model:exibirModal="exibirModalCriarInboxItem"
        @reloadListaInboxItem="loadInboxItem()">
      </ModalCriarInboxItem>
      
      <ModalCriarInboxItemLote
        v-model:exibirModal="exibirModalCriarInboxItemLote"
        @reloadListaInboxItem="loadInboxItem()">
      </ModalCriarInboxItemLote>

      <ModalEditarInboxItem
        v-model:exibirModal="exibirModalEditarInboxItem"
        :inboxItem="inboxItemModalEditarInboxItem"
        @reloadListaInboxItem="loadInboxItem()">
      </ModalEditarInboxItem>

      <!-- LISTA INBOXITEMS -->
      <div class="flex-wrap" v-if="inboxItems != [] && !busyInboxLoad && !busyInboxDelete">
        <div v-for="inboxItem in inboxItems" :key="inboxItem.id">

          <div class="inboxItem darkmodeBgBlack div_border_gray mb-10 mx-5 py-10 px-10" @click="toggleModalEditarInboxItem(inboxItem)">

            <div class="flex justify-spacebetween"> <!-- LINHA SUPERIOR -->

              <div> <!-- TEXTO -->
                <div class="mb-10">
                  <span class="additionalTag p-5 mr-10">
                    {{ inboxItem.categoriaItem?.categoria ?? '-'}}
                  </span>
                  <span class="additionalTag p-5 mr-10">
                    {{ inboxItem.origemDescritivo }}
                  </span>
                  <span v-html="inboxItem.linkTag"></span>
                </div>
                <div class="mb-10">
                  <span>
                      {{ inboxItem.nome }}
                  </span>
                </div>
                <!-- <div class="mb-10">
                  <span v-html="inboxItem.linkTag"></span>
                </div> -->
                <div class="mb-10">
                  <span>
                      {{ limit(inboxItem.acao,50) }}
                  </span>
                </div>
                
                <!-- <div v-if="tarefa.editMode" class="m-10">
                    <input :disabled="tarefa.busyInboxUpdate" name="descricao" type="text" v-model="tarefa.descricaoEditar">
                </div> -->
              </div>
              <div> <!-- BUTTONS -->
                <!-- <button v-if="!tarefa.editMode" class="btn btn-sm btn_tarefa_concluida" type="button" 
                  @click="toggleEdicaoTarefa(tarefa)">
                  Editar
                </button> -->
                <!-- <button v-if="tarefa.editMode" class="btn mx-5 my-5 btn-sm" type="button"
                    :disabled="tarefa.busyInboxUpdate"
                    @click="cancelarEdicaoTarefa(tarefa)">
                    Cancelar
                </button> -->
                <!-- <button v-if="tarefa.editMode" class="btn mx-5 my-5 btn-sm" type="button"
                    :disabled="tarefa.busyInboxUpdate"
                    @click="salvarEdicaoTarefa(tarefa)">
                    Salvar
                </button> -->
              </div>
            </div>
            
            <div> <!-- LINHA INFERIOR -->
              <InlineLoader
                :textoAguarde="true"
                :busy="inboxItem.busyInboxUpdate"
                :center="true">
              </InlineLoader>
            </div>
          </div>

        </div>
      </div>

    <Notifier ref="notifier"></Notifier>

    </div>
  </div>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import Request from '@/core/request.js';
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js'
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import ModalCriarInboxItem from '@/views/inbox/ModalCriarInboxItem.vue';
import ModalCriarInboxItemLote from '@/views/inbox/ModalCriarInboxItemLote.vue';
import ModalEditarInboxItem from '@/views/inbox/ModalEditarInboxItem.vue';
import CategoriaApi from '@/core/apis/CategoriaApi.js'

export default {
  name: 'HabitTracker',
  components: {
    InlineLoader,
    ModalCriarInboxItem,
    ModalCriarInboxItemLote,
    ModalEditarInboxItem,
    Notifier,
  },
  inject: ['configuracoes'],
  data: () => {
    return {
      busyInboxLoad: false,
      busyInboxDelete: false,
      busyInboxUpdate: false,
      busyInboxLoad: false,
      busyLoadCategorias: false,
      listaCategorias: [],
      categoriaEscolhida: [],
      dataPrazo: '',
      inboxItems: [],
      exibirModalCriarInboxItem: false,
      exibirModalCriarInboxItemLote: false,
      inboxItemModalEditarInboxItem: [],
      exibirModalEditarInboxItem: false,
      filtroPrioridade: null,
      filtroSituacao: null,
      nextProgramedListingAmount: 0,
    }
  },
  methods: {
    
    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},
    limit(string, limit){
      return string.substring(0,limit) + (string.length > limit ? '...' : '')
    },

    /**
     * EDIT FORMS
     */
    // toggleEdicaoTarefa(tarefa) {
    //   if(tarefa.editMode == undefined) tarefa.editMode = false;
    //   if(tarefa.descricaoEditar == undefined) tarefa.descricaoEditar = tarefa.descricao;
    //   tarefa.editMode = !tarefa.editMode
    // },
    // cancelarEdicaoTarefa(tarefa) {
    //   this.toggleEdicaoTarefa(tarefa)
    //   tarefa.descricaoEditar = tarefa.descricao;
    // },
    // salvarEdicaoTarefa(tarefa) {
    //   console.log(tarefa.descricaoEditar)
    //   tarefa.descricao = tarefa.descricaoEditar
    //   console.log(tarefa);
    //   this.updateTarefa(tarefa);
    // },

    toggleModalCriarInboxItem() {
      this.exibirModalCriarInboxItem = true;
    },
    
    toggleModalCriarInboxItemLote() {
      this.exibirModalCriarInboxItemLote = true;
    },

    toggleModalEditarInboxItem(inboxItem) {
      this.inboxItemModalEditarInboxItem = inboxItem
      this.exibirModalEditarInboxItem = true;
    },


    // updateTarefa(tarefa) {
    //   console.log(tarefa.id);
    //   tarefa.busyInboxUpdate = true;
    //   let body = {
    //     'descricao': tarefa.descricao,
    //     'hora': tarefa.hora,
    //   };
    //   let requestData = {
    //     'url': `${config.serverUrl}/tarefas/${tarefa.id}`,
    //     'headers': new Headers({'Content-Type': 'application/json'}),
    //     'method' : 'PUT',
    //     'data' : body
    //   };
    //   return Request.fetch(requestData).then(([response, data]) => {
    //     tarefa.busyInboxUpdate = false;
    //     this.$refs.notifier.notify('Tarefa salva!')
    //     this.toggleEdicaoTarefa(tarefa)
    //     this.loadTarefas();
    //   }).catch((error) => {
    //     console.error(error);
    //     tarefa.busyInboxUpdate = false;
    //     this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
    //   });
    // },
    loadInboxItemCategoria(categoriaItem = null)
    {
      this.setCategoriaEscolhida(categoriaItem)
      this.loadInboxItem(categoriaItem?.id ?? null)
    },

    setCategoriaEscolhida(categoriaItem){
      this.categoriaEscolhida = categoriaItem ?? {'categoria':'Sem Categoria'};
    },

    loadInboxItem(){
      let categoria = this.categoriaEscolhida?.id ?? null
      this.busyInboxLoad = true;
      if(categoria == null) categoria = '0'
      const params = {
        'categoriaItem': categoria,
        'orderBy': 'created_at,desc'
      };
      let requestData = {
        'url': `${config.serverUrl}/inboxItems${QueryStringConverter.toQueryString(params, true)}`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        data = this.inboxItemsFillDefaults(data)
        console.log(data)
        this.inboxItems = data
        this.busyInboxLoad = false;
      })
      .catch((error) => {
        this.busyInboxLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    inboxItemsFillDefaults(inboxItems)
    {
      for (let i = 0; i < inboxItems.length; i++) {
        inboxItems[i].editMode = false;
        inboxItems[i].linkTag = `<a class='btn btn-sm btn-blue' target='blank' href='${inboxItems[i].link}'>Conteúdo</a> `;
        inboxItems[i].busyInboxUpdate = false;
      }
      return inboxItems;
    },
    
    
    loadListaCategorias()
    {
      this.busyLoadCategorias = true;
      CategoriaApi.loadListaCategorias(['categoria,asc']).then(([response, data]) => {
        console.log('lista categorias', data)
        this.listaCategorias = data
        this.busyLoadCategorias = false;
      }).catch((error) => {
        this.busyLoadCategorias = false;
        console.error(error)
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

  },
  watch: {
    configuracoes(a, b) {
      // do something
    }
  },
  created () {
    this.loadListaCategorias(['categoria,asc']);
    this.loadInboxItemCategoria(null);
  },
}
</script>
