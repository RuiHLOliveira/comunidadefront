<style scoped>
section {
  /* margin-bottom: 20px; */
}
section.header {
  h1 {
    margin-right: 10px;
  }
}

.projeto {
  
}

section.projetoList {
  flex-basis: 100%; /**mobile */
  flex-grow: 0;
  flex-shrink: 0;
  max-height: 100%; /**mobile */
  max-height: 83svh; /**desktop */
  overflow-y: scroll;
  div.projeto {
    justify-content: space-between;
    background-color: rgb(228, 228, 228);
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
    flex-basis: 300px; /**desktop */
    max-height: 87svh; /**desktop */
    overflow-y: scroll;
    margin-right: 10px;
  }
}


section.projetoShow {
  border-radius: 5px;
  flex: 1;
  /* height: 90svh; */
  max-height: 100%; /**mobile */
  overflow-y: visible;
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
    max-height: 87svh;
    overflow-y: scroll;
  }
}

.linhaBox {
  padding: 10px;
  border-radius: 5px;
  background-color: #d3d3d3;
  border: 1px solid #d3d3d3;
}
.linhaBox:hover {
  /* background-color: #cccccc; */
  border: 1px solid rgb(88, 88, 88);
}

</style>

<template>
  <div>
    <div class="container darkmodeBgBlack">

      <!-- HEADER -->
      <section class="darkmodeBgBlack div_border_gray my-5 py-5 px-10 header flex justify-spacebetween alignitens-center">
        <div class="flex alignitens-center">
          <h1>Primeira Página</h1>
        </div>
        <div>
        </div>
      </section>

      <div>

        <!-- PROJETO LIST -->
        <section class="projetoList" v-if="projetoExibir.id == null">

          <!-- FOR EACH PROJETOS -->
          <div class="mt-10 pt-5" v-if="projetos != [] && !busyProjetosLoad && !busyProjetosDelete">

            <div v-for="projeto in projetos" :key="projeto.id">
              <!-- TITLE -->
              <div class="projeto darkmodeBgBlack div_border_gray my-10 ml-5 mr-15" :class="{ 'flex' : !isSmallScreen, 'flex-column' : isSmallScreen}">
                
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
                  
                  <!-- PRIORIDADE -->
                  <button type="button" class="mr-10 btn btn-sm" @click="toggleShowProjeto(projeto)">
                    <i style="line-height: 0; font-size: 1.2rem;" class="fi fi-rr-arrow-small-right"></i>
                  </button>
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

        <!-- PROJETO SHOW -->
        <section class="projetoShow darkmodeBgBlack my-10 p-10 mx-5" v-if="projetoExibir.id != null">
        <!-- <div v-if="projetoExibir != [] && !busyProjetosLoad && !busyProjetosDelete"> -->
        <div v-if="projetoExibir.id != null">

          <div class="mb-10 flex justify-spacebetween">
            <div>
              <button v-if="!projetoExibir.editMode" class="btn mr-10 my-5 btn" type="button" @click="hideProjeto(projetoExibir)">Voltar</button>
              <button v-if="!projetoExibir.editMode" class="btn mx-10 my-5 btn" type="button" @click="toggleEdicaoProjeto(projetoExibir)">Editar</button>
              <button v-if="projetoExibir.editMode" class="btn mr-10 my-5 btn" type="button" @click="cancelarEdicaoProjeto(projetoExibir)">Cancelar</button>
            </div>
            <div>
              <button v-if="projetoExibir.editMode" class="btn mx-10 my-5 btn" type="button" @click="salvarEdicaoProjeto(projetoExibir)">Salvar</button>
              <button v-if="projetoExibir.editMode" class="btn mx-10 my-5 btn btn-red" type="button" @click="excluirProjeto(projetoExibir)">Excluir</button>
            </div>
          </div>

          <InlineLoader
            :textoAguarde="true"
            :busy="busyProjetosUpdate || busyProjetosDelete"
            :center="true">
          </InlineLoader>

          <div class="flex-column">
            <!-- COL 1 DADOS E TAREFAS -->
            <div class="mr-5">
              <div class="mb-15">
                <div class="mb-5">
                  <span class="projetoShowLabel">Título: </span>
                </div>
                <div v-if="!projetoExibir.editMode" class="linhaBox whitespace-pre">
                  {{ projetoExibir.nome }}
                </div>
                <div v-if="projetoExibir.editMode">
                  <input name="atividade" type="text" v-model="projetoExibir.nomeEditar">
                </div>
              </div>

              <div class="mb-15">
                <div v-if="!projetoExibir.editMode" class="">
                  <!-- FIXADO -->
                  <!-- SITUACAO -->
                  <button type="button" class="btn btn-sm btnPrioridade mr-5"
                    :class="{
                      situacaoFixedWidth : configs.situacaoFixedWidth == true,
                      situacaoPendente : projetoExibir.situacao == 1,
                      situacaoAguardandoResposta : projetoExibir.situacao == 2,
                      situacaoPausado : projetoExibir.situacao == 3,
                      situacaoConcluido : projetoExibir.situacao == 4,
                    }">
                    {{ projetoExibir.situacao }}-{{ projetoExibir.situacaoDescritivo }}
                  </button>
                  <!-- PRIORIDADE -->
                  <button type="button" class="btn btn-sm btnPrioridade mr-5"
                    :class="{
                      prioridadeFixedWidth : configs.prioridadeFixedWidth == true,
                      prioridadeUrgente : projetoExibir.prioridade == 1,
                      prioridadeAlta : projetoExibir.prioridade == 2,
                      prioridadeMedia : projetoExibir.prioridade == 3,
                      prioridadeBaixa : projetoExibir.prioridade == 4,
                      prioridadeBaixissima : projetoExibir.prioridade == 5,
                    }">
                    {{ projetoExibir.prioridade }}-{{ projetoExibir.prioridadeDescritivo }}
                  </button>
                  <button type="button" disabled="true"
                    v-if="!projetoExibir.editMode && projetoExibir.fixado"
                    class="btn btn-sm btn-clear mr-10 my-5 btn">
                    <i class="fi fi-ss-thumbtack"></i>
                  </button>
                </div>

                <div v-if="projetoExibir.editMode">
                  <div class="marginVerticalSpacer">
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 situacaoPendente"
                      :class="{selected : projetoExibir.situacaoEditar == 1}"
                      @click="toggleEditarSituacao(projetoExibir, 1)">
                      0-Pendente
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 situacaoAguardandoResposta"
                      :class="{selected : projetoExibir.situacaoEditar == 2}"
                      @click="toggleEditarSituacao(projetoExibir, 2)">
                      1-Espera
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 situacaoPausado"
                      :class="{selected : projetoExibir.situacaoEditar == 3}"
                      @click="toggleEditarSituacao(projetoExibir, 3)">
                      2-Suspenso
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 situacaoConcluido"
                      :class="{selected : projetoExibir.situacaoEditar == 4}"
                      @click="toggleEditarSituacao(projetoExibir, 4)">
                      3-Concluído
                    </button>
                  </div>
                  <div class="marginVerticalSpacer">
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeUrgente"
                      :class="{selected : projetoExibir.prioridadeEditar == 1}"
                      @click="toggleEditarPrioridade(projetoExibir, 1)">
                      1-Urgente
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeAlta"
                      :class="{selected : projetoExibir.prioridadeEditar == 2}"
                      @click="toggleEditarPrioridade(projetoExibir, 2)">
                      2-Alta
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeMedia"
                      :class="{selected : projetoExibir.prioridadeEditar == 3}"
                      @click="toggleEditarPrioridade(projetoExibir, 3)">
                      3-Media
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeBaixa"
                      :class="{selected : projetoExibir.prioridadeEditar == 4}"
                      @click="toggleEditarPrioridade(projetoExibir, 4)">
                      4-Baixa
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeBaixissima"
                      :class="{selected : projetoExibir.prioridadeEditar == 5}"
                      @click="toggleEditarPrioridade(projetoExibir, 5)">
                      5-Baixissima
                    </button>
                  </div>
                </div>
              </div>

              <!-- ANOTAÇÕES -->
              <div class="mb-15">
                <div class="mb-5">
                  <span class="projetoShowLabel">Anotações: </span>
                </div>
                <div v-if="!projetoExibir.editMode" class="whitespace-pre mb-5 linhaBox">
                  {{ projetoExibir.anotacoes }}
                </div>
                <div v-if="projetoExibir.editMode" class="mb-5">
                  <textarea
                    rows="20"
                    class="textarea"
                    name="anotacoes"
                    placeholder="anotacoes"
                    v-model="projetoExibir.anotacoesEditar">
                  </textarea>
                </div>
              </div>

              <!-- TAREFAS -->
              <div class="mb-15">
                <div class="mb-5">
                  <span class="projetoShowLabel">Tarefas: </span>
                </div>
                <div class="mb-5">
                  <button class="btn btn-sm" type="button" @click="toggleModalCriarTarefa(projetoExibir)">Criar Tarefa +</button>
                </div>
                <div v-if="projetoExibir.tarefas != []">
                  <div v-for="tarefa in projetoExibir.tarefas" :key="tarefa.id">
                    <div class="div_border_gray p-5 mb-5">
                      <div class="flex-wrap">
                        <div>
                          <span class="verticalalign-center mr-10 iconBig" v-if="tarefa.meuDia !== null && tarefa.meuDiaHoje"><i class="fi fi-sr-parking"></i></span>
                        </div>
                        <div>
                          <span class="verticalalign-center mr-10 iconBig" v-if="tarefa.meuDia !== null && !tarefa.meuDiaHoje"><i class="fi fi-rr-parking"></i></span>
                        </div>
                        <div>
                          <span class="verticalalign-center mr-10 check-pendente" v-if="tarefa.situacao == 0"><i class="fi fi-sr-square"></i></span>
                          <span class="verticalalign-center mr-10 check-concluido" v-if="tarefa.situacao == 1"><i class="fi fi-sr-checkbox"></i></span>
                          <span class="verticalalign-center mr-10 check-falhado" v-if="tarefa.situacao == 2"><i class="fi fi-sr-square-x"></i></span>
                        </div>
                        <div>
                          {{ tarefa.hora != null ? `[${tarefa.hora}]` : '' }}
                        </div>
                        <div>
                          {{ tarefa.descricao }}
                        </div>
                      </div>
                      <div>
                        <button class="btn btn-sm btn_tarefa_concluida" type="button" 
                          @click="toggleModalEditarTarefa(tarefa,projetoExibir)" >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>
        </section>

      </div>
  </div>

    <Notifier ref="notifier"></Notifier>

    <ModalCriarTarefa
      v-model:exibirModal="exibirModalCriarTarefa"
      :projeto="projetoModalNovaTarefa"
      @updateTaskEvent="guardarNovaTarefa">
    </ModalCriarTarefa>
    
    <ModalEditarTarefa
      v-model:exibirModal="exibirModalEditarTarefa"
      :tarefa="tarefaModalEditarTarefa"
      :projeto="projetoModalEditarTarefa"
      @updateTaskEvent="guardarTarefaAtualizada">
    </ModalEditarTarefa>
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
import ModalCriarProjeto from '@/views/projetos/ModalCriarProjeto.vue';
import ModalCriarTarefa from '@/views/projetos/ModalCriarTarefa.vue';
import ModalEditarTarefa from '@/views/projetos/ModalEditarTarefa.vue';
import BackupProjetos from "@/views/projetos/BackupProjetos.vue";

export default {
  name: 'HabitTracker',
  components: {
    Loader,
    InlineLoader,
    ModalCriarProjeto,
    ModalCriarTarefa,
    ModalEditarTarefa,
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
      exibirModalCriarTarefa: false,
      exibirModalEditarTarefa: false,
      projetoModalNovaTarefa: [],
      tarefaModalEditarTarefa: [],
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

    guardarNovaTarefa(novaTarefa)
    {
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == novaTarefa.projeto){
          this.projetos[i].tarefas.push(novaTarefa);
          break;
        }
      }
    },

    guardarTarefaAtualizada(tarefaAtualizada){
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == tarefaAtualizada.projeto){
          for (let j = 0; j < this.projetos[i].tarefas.length; j++) {
            if(this.projetos[i].tarefas[j].id == tarefaAtualizada.id){
              this.projetos[i].tarefas[j] = tarefaAtualizada
              break;
            }
          }
        }
      }
    },

    toggleModalCriarTarefa (projeto) {
      this.projetoModalNovaTarefa = projeto
      this.exibirModalCriarTarefa = true;
    },

    toggleModalEditarTarefa (tarefa, projeto) {
      this.tarefaModalEditarTarefa = tarefa
      this.exibirModalEditarTarefa = true;
      this.projetoModalEditarTarefa = projeto
    },
    toggleFiltroSituacao(novaSituacao){
      this.filtroSituacao = novaSituacao;
    },
    toggleFiltroPrioridade(novaPrioridade){
      this.filtroPrioridade = novaPrioridade;
    },


    /**
     * EDIT FORMS
     */
    toggleEdicaoProjeto(projeto) {
      projeto.prioridadeEditar = projeto.prioridade;
      projeto.situacaoEditar = projeto.situacao;
      projeto.editMode = !projeto.editMode
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
    buscaProjetos () {
      this.busyProjetosLoad = true;
      let params = {
        'loadTarefas': true,
        'fixado': true,
      };
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
        if(this.projetos.length == 1) this.projetoExibir = this.projetos[0];
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

    filtraListaProjeto()
    {
      if(this.projetoBackup.length == 0){
        this.projetoBackup = this.projetos;
      }
      this.projetos = this.projetoBackup;
      var arrayfilter = [];

      //aplica filtragem por texto
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].nome.toLowerCase().includes(this.filtroNomeProjeto.toLowerCase())){
          arrayfilter.push(this.projetos[i])
        }
      }
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
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions);
    this.getDimensions()
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions);
  },
  created () {
    this.buscaProjetos();
  },
}
</script>
