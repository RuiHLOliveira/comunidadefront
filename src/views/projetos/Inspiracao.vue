<style scoped>

.projetofoto {
  /* border: 10px solid #ffddbb;
  border: 10px solid #f7e4d1; */
  outline: 3px #4e4e4e;
  outline-style: solid;
  outline-offset: 5px;
  /* border-radius: 20px; */
  max-width: 400px;
  max-height: 300px;
}

section.projetoList {
  flex-basis: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  div.projeto {
    justify-content: space-between;
    background-color: var(--darkmode-bg-color);
    color: var(--darkmode-font-color);
    /* border-radius: 5px; */
    button.situacaoFixedWidth {
      min-width: 100px;
      max-width: 100px;
    }
    button.prioridadeFixedWidth {
      min-width: 100px;
      max-width: 100px;
    }
    .col1 {
      /* border-right: 1px solid rgb(167, 167, 167); */
      width: 68%;
      display: inline-block;
    }
    .col2 {
      text-align: center;
      /* border-right: 1px solid rgb(167, 167, 167); */
      width: 10%;
      min-width: 100px;
      display: inline-block;
    }
    .col3 {
      text-align: center;
      /* border-right: 1px solid rgb(167, 167, 167); */
      width: 10%;
      min-width: 100px;
      display: inline-block;
    }
    .col4 {
      text-align: center;
      /* border-right: 1px solid rgb(167, 167, 167); */
      width: 4%;
      min-width: 4%;
      max-width: 4%;
      display: inline-block;
    }
  }
}
@media only screen and (min-width: 800px) {
  section.projetoList {
    flex-basis: 300px;
  }
}


section.projetoShow {
  /**mobile */
  border-radius: 5px;
  flex: 1;
  /* height: 90svh; */
  max-height: 100%;
  .projetoShowLabel{
    /* font-style: italic; */
    /* text-decoration: underline; */
    font-size: 1.3rem;
    /* font-weight: bold; */
    color: #000000;
  }
}
@media only screen and (min-width: 800px) {
  section.projetoShow {
    flex:1;
  }
}

</style>

<template>
  <div>
    <div class="container darkmodeBgBlack">

      
      <div class="position_sticky darkmodeBgBlack pb-10 div_border_bottom_gray">
        <!-- HEADER -->
        <section class="darkmodeBgBlack div_border_gray my-5 py-5 px-10 header flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1>OBJETIVOS e FOTOS</h1>
          </div>
        </section>

        <div>
          <!-- FILTER -->
          <div class="mt-10 p-5 darkmodeBgBlack flex-wrap" v-if="projetoExibir.id == null">
            <div class="mr-15">
              <input @keyup="filtraListaProjeto()" name="filtroNomeProjeto" placeholder="filtro nome do projeto" type="text" v-model="filtroNomeProjeto">
            </div>
            <!-- SITUACAO -->
            <select class="smallSelect mr-15" v-model="selectedSituacao" name="situacao" id="situacao" @click="filtraListaProjeto()">
              <option value="0">Todos</option>
              <option value="1">Pendente</option>
              <option value="2">Espera</option>
              <option value="3">Pausado</option>
              <option value="4">Concluído</option>
            </select>
            <!-- PRIORIDADE -->
            <select class="smallSelect mr-15" v-model="selectedPrioridade" name="prioridade" id="prioridade" @click="filtraListaProjeto()">
              <option value="0">Todos</option>
              <option value="1">Urgente</option>
              <option value="2">Alta</option>
              <option value="3">Media</option>
              <option value="4">Baixa</option>
              <option value="5">Baixissima</option>
            </select>
            <!-- BUTTON -->
            <div class="mr-15">
              <button class="btn my-5 btn-sm" type="button" @click="buscaProjetos()">Recarregar Lista</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- PROJETO LIST -->
        <section class="projetoList" v-if="projetoExibir.id == null">

          <!-- FOR EACH PROJETOS -->
          <div class="mt-10 pt-5" v-if="projetos != [] && !busyProjetosLoad && !busyProjetosDelete">

            <div v-for="projeto in projetos" :key="projeto.id">

              <div v-if="projeto.nome.includes('OBJ - ')" class="div_border_gray">

                <div class="projeto darkmodeBgBlack my-10 ml-5 mr-15"
                :class="{ 'flex' : !isSmallScreen, 'flex-column' : isSmallScreen}">
                  <!-- PROJETO NOME -->
                  <span class="py-10 px-10">
                    {{ projeto.nome }}
                  </span>
                  <!-- TAGS -->
                  <div class="py-5 px-10 flex alignitens-center">
                    <!-- fixado -->
                    <button type="button" disabled="true"
                      v-if="!projetoExibir.editMode && projeto.fixado"
                      class="btn btn-sm btn-clear mr-10 my-5 btn">
                      <i class="fi fi-ss-thumbtack"></i>
                    </button>
                    <!-- SITUACAO -->
                    <button type="button" class="mr-10 btn btn-sm btnPrioridade"
                      :class="{
                        situacaoFixedWidth : configs.situacaoFixedWidth == true,
                        situacaoPendente : projeto.situacao == 1,
                        situacaoAguardandoResposta : projeto.situacao == 2,
                        situacaoPausado : projeto.situacao == 3,
                        situacaoConcluido : projeto.situacao == 4,
                      }">
                      {{ projeto.situacao }}-{{ projeto.situacaoDescritivo }}
                    </button>
                    <!-- PRIORIDADE -->
                    <button type="button" class="mr-10 btn btn-sm btnPrioridade"
                      :class="{
                        prioridadeFixedWidth : configs.prioridadeFixedWidth == true,
                        prioridadeUrgente : projeto.prioridade == 1,
                        prioridadeAlta : projeto.prioridade == 2,
                        prioridadeMedia : projeto.prioridade == 3,
                        prioridadeBaixa : projeto.prioridade == 4,
                        prioridadeBaixissima : projeto.prioridade == 5,
                      }">
                      {{ projeto.prioridade }}-{{ projeto.prioridadeDescritivo }}
                    </button>
                  </div>
                  
                  <div class="my-10 ml-5 mr-15">
                    <button class="btn btn-sm mr-15" type="button" @click="toggleModalCriarProjetofoto(projeto)">Criar Foto Link +</button>
                  </div>
                </div>


                <div v-if="projeto.projetosfotos.length > 0">
                  <div class="flex-wrap justify-center">
                    <!-- CADA PROJETO FOTO -->
                    <div v-for="projetofoto in projeto.projetosfotos" :key="projetofoto?.id"
                      class="flex-wrap justify-center"
                      style="width:90%; border-top: 3px solid #404040;">
                      <div class="flex-column mx-5 p-5 mb-15" v-if="projetofoto != null">
                          <div class="mb-10">
                            {{ projetofoto.descricao }}
                            <button class="btn btn-sm btn_tarefa_concluida" type="button" 
                              @click="toggleModalEditarProjetofoto(projetofoto,projeto)" >
                              Editar
                            </button> 
                          </div>
                          <div>
                            <img :src="projetofoto.link" class="projetofoto" />
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <div class="darkmodeBgBlack my-5 py-5" v-if="busyProjetosLoad">
          <InlineLoader
            :textoAguarde="true"
            :busy="busyProjetosLoad"
            :center="true">
          </InlineLoader>
        </div>

      </div>
  </div>

    <Notifier ref="notifier"></Notifier>

    <ModalCriarProjetofoto
      v-model:exibirModal="exibirModalCriarProjetofoto"
      :projeto="projetoModalNovoProjetofoto"
      @createdProjetofotoEvent="guardarNovoProjetofoto">
    </ModalCriarProjetofoto>

    <ModalEditarProjetofoto
      v-model:exibirModal="exibirModalEditarProjetofoto"
      :projetofoto="projetofotoModalEditarProjetofoto"
      :projeto="projetoModalEditarProjetofoto"
      @updatedProjetofotoEvent="guardarProjetofotoAtualizado">
    </ModalEditarProjetofoto>

  </div>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import Request from '@/core/request.js';
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js'
import Loader from '@/components/Loader.vue';
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import ModalCriarProjetofoto from '@/views/projetos/ModalCriarProjetofoto.vue';
import ModalEditarProjetofoto from '@/views/projetos/ModalEditarProjetofoto.vue';
import BackupProjetos from "@/views/projetos/BackupProjetos.vue";

export default {
  name: 'HabitTracker',
  components: {
    Loader,
    InlineLoader,
    ModalCriarProjetofoto,
    ModalEditarProjetofoto,
    BackupProjetos,
    Notifier,
  },
  inject: ['configuracoes'],
  data: () => {
    return {
      configs: {
        situacaoFixedWidth: false,
        prioridadeFixedWidth: false
      },
      busyProjetosLoad: false,
      busyProjetosDelete: false,
      busyProjetosUpdate: false,
      busyTarefasLoad: false,
      dataPrazo: '',
      projetos: [],
      projetoBackup: [],
      exibirModalCriarProjeto: false,
      projetoModalEditarTarefa: [],
      exibirModalBackupProjetos: false,
      carregarPreviamenteAsTarefas: true,
      filtroPrioridade: null,
      filtroSituacao: null,
      nextProgramedListingAmount: 0,
      filtroNomeProjeto: '',
      projetoExibir: [],
      selectedSituacao: 0,
      selectedPrioridade: 0,
      
      exibirModalCriarProjetofoto: false,
      projetoModalNovoProjetofoto: [],
      exibirModalEditarProjetofoto: false,
      projetoModalEditarProjetofoto: [],
      projetofotoModalEditarProjetofoto: [],
      collapsarProjetosfotos: true,
      
      windowWidth: 0,
      windowHeight: 0,
    }
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth < 800
    },
  },
  methods: {
    
    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},
    getWeekDayFirstLetter(dateObject){return DateTime.getWeekDayFirstLetter(dateObject);},
    getYear(dateObject){return DateTime.getYear(dateObject);},
    getMonth(dateObject){return DateTime.getMonth(dateObject);},
    getDate(dateObject){return DateTime.getDate(dateObject);},
    getWeekDayNumber(dateObject){return DateTime.getWeekDayNumber(dateObject);},
    newDatetimeTz(dateString){return DateTime.newDatetimeTz(dateString);},
    isSameYMD(date1, date2){return DateTime.isSameYMD(date1, date2);},

    getProjetoUrl(projeto) {
      let url = '/projetosListV2/projeto/'+projeto.id;
      return url;
    },

    showProjetoFromQueryIdProjeto() {
      if(this.$route.params.idProjeto != undefined && this.$route.params.idProjeto != null && this.$route.params.idProjeto != '') {
        const projeto = this.findProjeto(this.$route.params.idProjeto)
        this.toggleShowProjeto(projeto);
      } else {
        this.hideProjeto(this.projetoExibir)
      }
    },

    findProjeto(idProjeto){
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == idProjeto){
          return this.projetos[i];
        }
      }
    },

    /**
     * FUNCOES TOGGLE
     */
    toggleShowProjeto(projeto) {
      this.hideProjeto(projeto)
      projeto.selected = true
      this.projetoExibir = projeto
    },
    hideProjeto(projeto) {
      this.projetoExibir.selected = false
      projeto.selected = false
      this.projetoExibir = []
    },

    guardarNovoProjetofoto(novo)
    {
      console.log("novo projeto foto",novo);
      console.log("projetos",this.projetos);
      console.log("projetoBackup",this.projetoBackup);

      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == novo.projeto){
          this.projetos[i].projetosfotos.push(novo);
          break;
        }
      }
    },


    guardarProjetofotoAtualizado(projetofotoAtualizado){
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == projetofotoAtualizado.projeto){
          for (let j = 0; j < this.projetos[i].projetosfotos.length; j++) {
            if(this.projetos[i].projetosfotos[j].id == projetofotoAtualizado.id){
              if(projetofotoAtualizado.excluido == true){
                this.projetos[i].projetosfotos[j] = null;
              } else {
                this.projetos[i].projetosfotos[j] = projetofotoAtualizado
              }
              break;
            }
          }
        }
      }
    },


    toggleCollapsarProjetosfotos()
    {
      this.collapsarProjetosfotos = !this.collapsarProjetosfotos;
    },
    
    toggleModalCriarProjeto () {
      this.exibirModalCriarProjeto = true;
    },

    toggleFiltroSituacao(novaSituacao){
      this.filtroSituacao = novaSituacao;
    },
    toggleFiltroPrioridade(novaPrioridade){
      this.filtroPrioridade = novaPrioridade;
    },

    toggleModalCriarProjetofoto (projeto) {
      this.projetoModalNovoProjetofoto = projeto
      this.exibirModalCriarProjetofoto = true;
    },
    toggleModalEditarProjetofoto (projetofoto, projeto) {
      this.projetofotoModalEditarProjetofoto = projetofoto
      this.exibirModalEditarProjetofoto = true;
      this.projetoModalEditarProjetofoto = projeto
    },

    /**
     * EDIT FORMS
     */
    toggleEdicaoProjeto(projeto) {
      projeto.prioridadeEditar = projeto.prioridade;
      projeto.situacaoEditar = projeto.situacao;
      projeto.editMode = !projeto.editMode
      if(projeto.editMode == true){
        // configuração para autosize
        setTimeout(() => {
          let element = document.getElementById('projetoExibirAnotacoesEditarTextarea');
          if(element != null) {
            console.log('event added');
            element.addEventListener('input', function(e){
              this.style.height = this.scrollHeight + 3 + 'px';
            })
            element.style.height = element.scrollHeight + 3 + 'px';
          }
        }, 1);
      }
    },
    toggleFixarProjeto(projeto) {
      // ask for confirmation
      this.busyProjetosDelete = true;
      let requestData = {
        'url': `${config.serverUrl}/projetos/${projeto.id}/fixar-desafixar`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyProjetosDelete = false;
        if(projeto.fixado == false) {
          this.$refs.notifier.notify('Projeto fixado!')
        } else {
          this.$refs.notifier.notify('Projeto desafixado!')
        }
        projeto.fixado = !projeto.fixado
      }).catch((error) => {
        console.error(error);
        this.busyProjetosDelete = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },
    cancelarEdicaoProjeto(projeto) {
      this.toggleEdicaoProjeto(projeto)
      projeto.nomeEditar = projeto.nome;
      projeto.anotacoesEditar = projeto.anotacoes;
    },
    salvarEdicaoProjeto(projeto) {
      console.log(projeto.nomeEditar)
      console.log(projeto.anotacoesEditar)
      projeto.nome = projeto.nomeEditar
      projeto.anotacoes = projeto.anotacoesEditar
      projeto.prioridade = projeto.prioridadeEditar
      projeto.situacao = projeto.situacaoEditar
      console.log(projeto);
      this.updateProjeto(projeto);
    },
    toggleEditarSituacao(projeto, novaSituacao){
      projeto.situacaoEditar = novaSituacao;
    },
    toggleEditarPrioridade(projeto, novaPrioridade){
      projeto.prioridadeEditar = novaPrioridade;
    },


    excluirProjeto(projeto) {
      // ask for confirmation
      if(!confirm("Deseja apagar o projeto?")){
        return;
      }
      console.log(projeto.id);
      this.busyProjetosDelete = true;
      let requestData = {
        'url': `${config.serverUrl}/projetos/${projeto.id}`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'DELETE',
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyProjetosDelete = false;
        this.$refs.notifier.notify('Projeto excluído!')
        this.toggleEdicaoProjeto(projeto)
        this.buscaProjetos();
      }).catch((error) => {
        console.error(error);
        this.busyProjetosDelete = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },

    /**
     * FUNCOES FETCH API
     */
    buscaProjetos (primeiraExecucao = false) {
      this.busyProjetosLoad = true;
      let params = {};
      params['loadTarefas'] = this.carregarPreviamenteAsTarefas;
      params['loadProjetosfotos'] = true;
      if(this.selectedPrioridade != null && this.selectedPrioridade > 0){
        params['prioridade'] = this.selectedPrioridade;
      }
      if(this.selectedSituacao != null && this.selectedSituacao > 0){
        params['situacao'] = this.selectedSituacao;
      }
      params['orderBy'] = 'nome,asc'
      params = QueryStringConverter.toQueryString(params, true);
      let requestData = {
        'url': `${config.serverUrl}/projetos${params}`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        console.log({data});
        data = this.projetosFillAdditionalProps(data)
        data = this.projetosTarefasFillAdditionalProps(data)
        this.projetos = data
        this.projetoBackup = this.projetos
        this.busyProjetosLoad = false;
        if(primeiraExecucao) this.showProjetoFromQueryIdProjeto();
      })
      .catch((error) => {
        this.busyProjetosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },
    
    projetosTarefasFillAdditionalProps(projetos){
      let dateHoje = new Date();
      for (let i = 0; i < projetos.length; i++) {
        for (let j = 0; j < projetos[i].tarefas.length; j++) {
          let dateMeuDia = this.newDatetimeTz(projetos[i].tarefas[j].meuDia);
          let tarefaDeHoje = this.isSameYMD(dateMeuDia, dateHoje);
          if(tarefaDeHoje){
            projetos[i].tarefas[j].meuDiaHoje = true;
          }
        }
      }
      return projetos;
    },

    projetosFillAdditionalProps(projetos) {
      for (let i = 0; i < projetos.length; i++) {
        projetos[i].nomeEditar = projetos[i].nome;
        projetos[i].anotacoesEditar = projetos[i].anotacoes;
        projetos[i].prioridadeEditar = projetos[i].prioridade;
        projetos[i].situacaoEditar = projetos[i].situacao;
        projetos[i].editMode = false;
        projetos[i].selected = false;
      }
      return projetos;
    },

    updateProjeto(projeto) {
      console.log(projeto.id);
      this.busyProjetosUpdate = true;
      let body = {
        'dataPrazo': projeto.dataPrazo,
        'nome': projeto.nome,
        'anotacoes': projeto.anotacoes,
        'prioridade': projeto.prioridade,
        'situacao': projeto.situacao,
      };

      let requestData = {
        'url': `${config.serverUrl}/projetos/${projeto.id}`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyProjetosUpdate = false;
        // this.resetFields(true)
        this.$refs.notifier.notify('Projeto salvo!')
        this.toggleEdicaoProjeto(projeto)
        // this.buscaProjetos(); // nao atualiza a lista para não atrapalhar o fluxo
      }).catch((error) => {
        console.error(error);
        this.busyProjetosUpdate = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },

    loadProjetosfotos(projeto){
      this.busyProjetosfotosLoad = true;
      const params = {'projeto': projeto.id};
      let requestData = {
        'url': `${config.serverUrl}/projetosfotos${QueryStringConverter.toQueryString(params, true)}`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        projeto.projetosfotos = data
        this.busyProjetosfotosLoad = false;
      })
      .catch((error) => {
        this.busyProjetosfotosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    filtraListaProjeto()
    {
      // guarda o backup se não existir
      if(this.projetoBackup.length == 0){
        this.projetoBackup = this.projetos;
      }
      // recupera o backup para listar de forma completa
      // this.projetos = this.projetoBackup;
      let listaProjetos = this.projetoBackup;

      let arrayfilter = [];
      let nomeProjetoFiltro = this.filtroNomeProjeto.toLowerCase();
      let situacaoFiltro = this.selectedSituacao != 0 ? this.selectedSituacao : null;
      let prioridadeFiltro = this.selectedPrioridade != 0 ? this.selectedPrioridade : null;
      
      // ************************ filtro por situação
      if(situacaoFiltro != null){
        arrayfilter = [];
        for (let i = 0; i < listaProjetos.length; i++) {
          if(listaProjetos[i].situacao == situacaoFiltro){
            arrayfilter.push(listaProjetos[i])
          }
        }
        listaProjetos = arrayfilter;
      }
      // ************************ filtro por prioridade
      if(prioridadeFiltro != null){
        arrayfilter = [];
        for (let i = 0; i < listaProjetos.length; i++) {
          if(listaProjetos[i].prioridade == prioridadeFiltro){
            arrayfilter.push(listaProjetos[i])
          }
        }
        listaProjetos = arrayfilter;
      }
      // ************************ filtro por texto
      if(nomeProjetoFiltro != null){
        arrayfilter = [];
        for (let i = 0; i < listaProjetos.length; i++) {
          if(listaProjetos[i].nome.toLowerCase().includes(nomeProjetoFiltro)){
            arrayfilter.push(listaProjetos[i])
          }
        }
        listaProjetos = arrayfilter;
      }
      // ************************ atribuição final
      this.projetos = arrayfilter
    },

    getDimensions() {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
    },

  },
  watch: {
    configuracoes(a, b) {
      // do something
    },
    $route (to, from){
      this.showProjetoFromQueryIdProjeto();
    }
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions);
    this.getDimensions()
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions);
  },
  created () {
    this.buscaProjetos(true);
  },
}
</script>
