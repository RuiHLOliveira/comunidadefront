<style scoped>


</style>

<template>
  <div>
    <div class="container darkmodeBgBlack">
      
      <div class="position_sticky div_border_bottom_gray darkmodeBgBlack">
        <section class="mb-10 p-10 pb-15">
          <!-- style="min-height: 11vh" -->
          <div class="flex-wrap">
            <h1 class="titulo">Tarefas</h1>
            <div class="mt-5">
              <button type="button" class="ml-5 btn btn-sm btn-clear"
                @click="toggleShowMotivoTodasTarefas()">Motivos
              </button>
              <button type="button" class="ml-5 btn btn-sm btn-clear"
                @click="toggleModalCriarTarefa()">Criar
              </button>
            </div>
            <div class="mt-5">
              <button type="button" class="ml-5 btn btn-sm btn-clear"
                @click="ordenarPorData()">
                  {{ deveOrdenarPorData ? 'Restaurar' : 'Ordenar' }}
              </button>
              <button v-if="deveOrdenarPorData" type="button" class="ml-5 btn btn-sm btn-clear"
                @click="inverterOrdem()">
                  Inverter
              </button>
            </div>
          </div>
          <div class="flex-column  mt-10">

            <!-- <span class="mr-5">Filtros:</span> -->

            <div class="flex-wrap" style="align-items: center;">

              <select class="smallSelect mr-5" v-model="selectedPrioridade" name="prioridade" id="prioridade" @change="filtraListaTarefas()">
                <option value="0">Todos</option>
                <option value="1">Prioridade 1</option>
                <option value="2">Prioridade 2</option>
                <option value="3">Prioridade 3</option>
                <option value="4">Prioridade 4</option>
                <option value="5">Prioridade 5</option>
              </select>

              <select class="smallSelect mr-5" v-model="selectedSituacao" name="situacao" id="situacao" @change="filtraListaTarefas()">
                <option value="0">Todos</option>
                <option value="1">Pendente</option>
                <option value="2">Completa</option>
                <option value="3">Falha</option>
              </select>

              <div class="flex alignitens-center" :class="{ 'mt-10': isSmallScreen, 'ml-10': !isSmallScreen,  }" >
                <input type="date" class="normalSizeInput mx-5" v-model="filtroDataInicio">
                <span class="mr-5">até</span>
                <input type="date" class="normalSizeInput ml-5" v-model="filtroDataFim">
              </div>
              
              <div class="flex" :class="{ 'mt-10': isSmallScreen }">
                <button type="button" class="ml-10 btn btn-sm btn-clear"
                  @click="filtraListaTarefas()">Filtrar
                </button>
                <button type="button" class="ml-10 btn btn-sm btn-clear"
                  @click="limparFiltroDatas()">Limpar datas
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>


      <!-- LISTA TAREFAS -->
      <div class="pt-10 px-10">
        <!-- LOADER -->
        <InlineLoader
          :textoAguarde="true"
          :busy="busyTarefasLoad || busyTarefasDelete"
          :center="true">
        </InlineLoader>

        <div v-if="tarefas != [] && !busyTarefasLoad && !busyTarefasDelete">
          <div v-for="tarefa in tarefas" :key="tarefa.id">

            <div v-if="tarefa.filtroNaoExibe == false" class="tarefa shadow-1" >

              <div class="flex-column">

                <div class="" :class="{'flex alignitens-center' : !isSmallScreen, 'flex-column' : isSmallScreen}">

                  <!-- LINHA 1 -->
                  <div class="flex-wrap alignitens-center">
                    <div class="">
                      <span class="mr-10 check-pendente" v-if="tarefa.situacao == 0"><i class="fi fi-sr-square"></i></span>
                      <span class="mr-10 check-concluido" v-if="tarefa.situacao == 1"><i class="fi fi-rr-checkbox"></i></span>
                      <span class="mr-10 check-falhado" v-if="tarefa.situacao == 2"><i class="fi fi-sr-square-x"></i></span>
                    </div>
                    <div class="">
                      <span class="mr-10 iconBig" v-if="tarefa.meuDia !== null && tarefa.meuDiaHoje"><i class="fi fi-sr-parking"></i></span>
                      <span class="mr-10 iconBig" v-if="tarefa.meuDia !== null && !tarefa.meuDiaHoje"><i class="fi fi-rr-parking"></i></span>
                    </div>
                    <div class="ycenter mr-10">
                      <span :class="{
                        'prioridade semPrioridade' : tarefa.prioridade == null,
                        'prioridade p1' : tarefa.prioridade == 1,
                        'prioridade p2' : tarefa.prioridade == 2,
                        'prioridade p3' : tarefa.prioridade == 3,
                        'prioridade p4' : tarefa.prioridade == 4,
                        'prioridade p5' : tarefa.prioridade == 5
                      }">{{ tarefa.prioridade != null ? 'Prioridade '+ tarefa.prioridade : 'Não possui' }}</span>
                    </div>
                  </div>

                  <!-- LINHA 1 BUTTONS -->
                  <div class="" :class="{'flex-column' : isSmallScreen, 'flex alignitens-center': !isSmallScreen}">

                    <div class="flex alignitens-center" :class="{'mt-10' : isSmallScreen, '': !isSmallScreen}">

                      <button v-if="!tarefa.editMode" class="btn btn-sm btn-clear btn_tarefa_concluida mr-10" type="button" 
                        :disabled="tarefa.busyTarefasUpdate"
                        @click="toggleModalEditarTarefa(tarefa)">
                          <i class="fi fi-rr-edit"></i>
                      </button>

                      <button v-if="!tarefa.editMode" class="my-10 btn btn-sm btn-clear btn_tarefa_concluida" type="button" 
                        :disabled="tarefa.busyTarefasUpdate"
                        @click="togglePrioridadesTarefa(tarefa)">
                          <i class="fi fi-sr-priority-importance"></i>
                      </button>

                      <div class="div_border_gray px-5 py-5 ml-10" v-if="tarefa.showMenuPrioridades" :class="{'': !isSmallScreen}">
                        <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm semPrioridade mr-10" type="button"
                          :disabled="tarefa.busyTarefasUpdate"
                          @click="updatePrioridade(tarefa, null)">x
                        </button>
                        <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p1 mr-10" type="button"
                          :disabled="tarefa.busyTarefasUpdate"
                          @click="updatePrioridade(tarefa, 1)">P1
                        </button>
                        <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p2 mr-10" type="button"
                          :disabled="tarefa.busyTarefasUpdate"
                          @click="updatePrioridade(tarefa, 2)">P2
                        </button>
                        <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p3 mr-10" type="button"
                          :disabled="tarefa.busyTarefasUpdate"
                          @click="updatePrioridade(tarefa, 3)">P3
                        </button>
                        <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p4 mr-10" type="button"
                          :disabled="tarefa.busyTarefasUpdate"
                          @click="updatePrioridade(tarefa, 4)">P4
                        </button>
                        <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p5" type="button"
                          :disabled="tarefa.busyTarefasUpdate"
                          @click="updatePrioridade(tarefa, 5)">P5
                        </button>
                      </div>
                    </div>
                    
                    <div class="ycenter" :class="{'mt-10' : isSmallScreen, 'ml-10': !isSmallScreen}">
                      <router-link class="mr-10 btn btn-sm btn-clear projetoNaTarefa p-5" :to='getProjetoUrl(tarefa.projeto)'>
                        {{ tarefa.projeto.nome }}
                      </router-link>
                    </div>

                  </div>
                  
                </div>

                <div>

                  <!-- LINHA 2 -->
                  <div class="mt-5 p-5">
                    <span class="data_com_tarefa">
                      {{ tarefa.datahoraFormatted != null ? `${tarefa.datahoraWeekday}, ${tarefa.datahoraFormatted}` : '___ __/__/__ __:__' }}
                    </span>
                    <!-- <span class="mr-5 ml-5">
                      <i style="line-height: 0; font-size: 1.2rem;" class="fi fi-rr-arrow-small-right"></i>
                    </span> -->
                    <span class="mr-5 ml-5">
                      -
                    </span>
                    <span class="">
                      {{ tarefa.descricao }}
                    </span>
                  </div>

                  <!-- LINHA 2 MOTIVO -->
                  <div class="mt-5 mb-5" v-if="showMotivo[tarefa.id]">
                    <span class="mr-5 p-5 pl-10 italicoSutil motivo_tarefa" >
                      "{{ tarefa.motivo ?? 'sem motivo cadastrado' }}"
                    </span>
                  </div>

                </div>

              </div>

              <div> <!-- LINHA INFERIOR -->
                <InlineLoader
                  :textoAguarde="true"
                  :busy="tarefa.busyTarefasUpdate"
                  :center="true">
                </InlineLoader>
              </div>
            </div>

          </div>
        </div>
      </div>

      
    <ModalCriarTarefa
      v-model:exibirModal="exibirModalCriarTarefa"
      :projeto="null">
    </ModalCriarTarefa>
    
    <ModalEditarTarefa
      v-model:exibirModal="exibirModalEditarTarefa"
      :tarefa="tarefaModalEditarTarefa"
      :projeto="projetoModalEditarTarefa"
      @updateTaskEvent="guardarTarefaAtualizada"
      @deletedTaskEvent="removeTarefaExcluida">
    </ModalEditarTarefa>

    <Notifier ref="notifier"></Notifier>

    </div>
  </div>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import Request from '@/core/request.js';
import config from '@/core/config.js'
import UrlBuilder from '../../core/urlBuilder';
import QueryStringConverter from '@/core/QueryStringConverter.js'
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import ModalCriarTarefa from '@/views/projetos/ModalCriarTarefa.vue';
import ModalEditarTarefa from '@/views/projetos/ModalEditarTarefa.vue';

export default {
  name: 'HabitTracker',
  components: {
    InlineLoader,
    ModalCriarTarefa,
    ModalEditarTarefa,
    Notifier,
  },
  inject: ['configuracoes'],
  data: () => {
    return {
      deveOrdenarPorData: false,
      ordemCrescente: false,
      busyTarefasLoad: false,
      busyTarefasDelete: false,
      busyTarefasUpdate: false,
      busyTarefasLoad: false,
      dataPrazo: '',
      tarefas: [],
      tarefasBackup: [],
      exibirModalCriarTarefa: false,
      exibirModalEditarTarefa: false,
      tarefaModalEditarTarefa: [],
      projetoModalEditarTarefa: [],
      carregarPreviamenteAsTarefas: true,
      filtroPrioridade: null,
      filtroSituacao: null,
      nextProgramedListingAmount: 0,
      showMotivo: [],
      windowWidth: 0,
      windowHeight: 0,
      selectedPrioridade: 0,
      selectedSituacao: 1,
      filtroDataInicio: null,
      filtroDataFim: null,
    }
  },
  computed: {
    isSmallScreen() {
      console.log(this.windowWidth);
      console.log(this.windowWidth < 800);
      return this.windowWidth < 800
    },
  },
  methods: {

    getProjetoUrl(projeto, fullpath = false) {
      let response = UrlBuilder.getProjetoUrl(projeto, fullpath);
      return response;
    },

    getDimensions() {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
    },

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
    // toggleModalCriarProjeto () {
    //   this.exibirModalCriarProjeto = true;
    // },
    toggleModalCriarTarefa () {
      this.exibirModalCriarTarefa = true;
    },
    toggleModalEditarTarefa (tarefa) {
      console.log('entrou');
      this.tarefaModalEditarTarefa = tarefa
      this.exibirModalEditarTarefa = true;
      this.projetoModalEditarTarefa = tarefa.projeto
    },

    limparFiltroDatas(){
      this.filtroDataInicio = null;
      this.filtroDataFim = null;
    },

    definicaoFiltroDataPadrao(usarDiaAtual = true)
    {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const daysToSunday = currentDay === 0 ? 0 : currentDay;
      const daysToSaturday = currentDay === 6 ? 0 : 6 - currentDay;

      let domingo = new Date(currentDate);
      domingo.setDate(currentDate.getDate() - daysToSunday);
      let sabado = new Date(currentDate);
      sabado.setDate(currentDate.getDate() + daysToSaturday);

      domingo = this.formatDevDate(domingo);
      sabado = this.formatDevDate(sabado);
      let hoje = this.formatDevDate(currentDate);

      if(usarDiaAtual) {
        this.filtroDataInicio = hoje;
        this.filtroDataFim = hoje;
      } else {
        this.filtroDataInicio = domingo;
        this.filtroDataFim = sabado;
      }

    },

    filtraListaTarefas() {

      let listaTarefas = this.tarefas;

      let prioridadeFiltro = this.selectedPrioridade != 0 ? this.selectedPrioridade : null;
      let situacaoFiltro = this.selectedSituacao != 0 ? this.selectedSituacao : null;
      
      for (let i = 0; i < listaTarefas.length; i++) {
        listaTarefas[i].filtroNaoExibe = false;
      }

      if(situacaoFiltro != null){
        situacaoFiltro = situacaoFiltro - 1;
        for (let i = 0; i < listaTarefas.length; i++) {
          if(listaTarefas[i].situacao != situacaoFiltro){
            listaTarefas[i].filtroNaoExibe = true
          }
        }
      }
      
      if(prioridadeFiltro != null && prioridadeFiltro != 0){
        for (let i = 0; i < listaTarefas.length; i++) {
          if(listaTarefas[i].prioridade != prioridadeFiltro){
            listaTarefas[i].filtroNaoExibe = true
          }
        }
      }

      if(this.filtroDataInicio != null && this.filtroDataInicio != ''
        && this.filtroDataFim != null && this.filtroDataFim != ''
      ){
        for (let i = 0; i < listaTarefas.length; i++) {
          if(listaTarefas[i].datahora < this.filtroDataInicio+' 00:00:00'){
            listaTarefas[i].filtroNaoExibe = true
          }
          if(listaTarefas[i].datahora > this.filtroDataFim+' 23:59:59'){
            listaTarefas[i].filtroNaoExibe = true
          }
          if(listaTarefas[i].datahora == null){
            listaTarefas[i].filtroNaoExibe = true
          }
        }
      }
      
      // ************************ atribuição final
      this.tarefas = listaTarefas
    },

    togglePrioridadesTarefa(tarefa)
    {
      tarefa.showMenuPrioridades = !tarefa.showMenuPrioridades
    },

    updatePrioridade(tarefa, prioridade)
    {
      tarefa.busyTarefasUpdate = true;
      let body = {
        'descricao': tarefa.descricao,
        'motivo': tarefa.motivo,
        'prioridade': prioridade,
        'datahora': tarefa.datahora,
      };
      let requestData = {
        'url': config.serverUrl + '/tarefas/' + tarefa.id + '/prioridade',
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Prioridade editada!')
        tarefa.busyTarefasUpdate = false;
        tarefa.prioridade = prioridade
      }).catch((error) => {
        console.error(error);
        tarefa.busyTarefasUpdate = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },

    toggleShowMotivoTodasTarefas () {
      for (let i = 0; i < this.tarefas.length; i++) {
        this.showMotivo[this.tarefas[i].id] = !this.showMotivo[this.tarefas[i].id];
      }
    },

    guardarTarefaAtualizada(tarefaAtualizada)
    {
      console.info("LOG guardando tarefa atualizada", tarefaAtualizada);
      let tarefas = this.tarefas
      for (let i = 0; i < tarefas.length; i++) {
        if(tarefas[i].id == tarefaAtualizada.id){
          console.info("LOG tarefa encontrada, guardando.");
          tarefas[i] = tarefaAtualizada
          break;
        }
      }
      tarefas = this.ordenarTarefasPorData(tarefas)
      this.tarefas = tarefas;
      // this.filtraListaTarefas(); // usuário irá filtrar manualmente
    },

    removeTarefaExcluida(tarefaExcluida)
    {
      let tarefas = this.tarefas

      const indice = tarefas.findIndex(tarefa => tarefa.id === tarefaExcluida.id);
      console.log('id para remover encontrado: ', indice);
      // Se o elemento foi encontrado (índice não é -1)
      if (indice !== -1) {
        console.log('removido');
        tarefas.splice(indice, 1);
      }
      tarefas = this.ordenarTarefasPorData(tarefas)
      this.tarefas = tarefas;
    },

    /**
     * EDIT FORMS
     */
    toggleEdicaoTarefa(tarefa) {
      if(tarefa.editMode == undefined) tarefa.editMode = false;
      if(tarefa.descricaoEditar == undefined) tarefa.descricaoEditar = tarefa.descricao;
      tarefa.editMode = !tarefa.editMode
    },
    cancelarEdicaoTarefa(tarefa) {
      this.toggleEdicaoTarefa(tarefa)
      tarefa.descricaoEditar = tarefa.descricao;
    },
    salvarEdicaoTarefa(tarefa) {
      console.log(tarefa.descricaoEditar)
      tarefa.descricao = tarefa.descricaoEditar
      console.log(tarefa);
      this.updateTarefa(tarefa);
    },

    updateTarefa(tarefa) {
      console.log(tarefa.id);
      tarefa.busyTarefasUpdate = true;
      let body = {
        'descricao': tarefa.descricao,
        'datahora': tarefa.datahora,
      };
      let requestData = {
        'url': `${config.serverUrl}/tarefas/${tarefa.id}`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      return Request.fetch(requestData).then(([response, data]) => {
        tarefa.busyTarefasUpdate = false;
        this.$refs.notifier.notify('Tarefa salva!')
        this.toggleEdicaoTarefa(tarefa)
        this.loadTarefas();
      }).catch((error) => {
        console.error(error);
        tarefa.busyTarefasUpdate = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },

    loadTarefas(){
      this.busyTarefasLoad = true;
      const params = {'orderBy': 'projeto,asc', 'properties' : 'projeto'};
      let requestData = {
        'url': `${config.serverUrl}/tarefas${QueryStringConverter.toQueryString(params, true)}`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        this.fillShowMotivo(data)
        data = this.tarefasFillDefaults(data)
        data = this.ordenarTarefasPorData(data)
        console.log(data)
        this.tarefas = data
        this.filtraListaTarefas();
        this.busyTarefasLoad = false;
      })
      .catch((error) => {
        this.busyTarefasLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },
    
    fillShowMotivo(tarefas)
    {
      for (let i = 0; i < tarefas.length; i++) {
        this.showMotivo[tarefas[i].id] = false;
      }
    },

    inverterOrdem(){
      this.ordemCrescente = !this.ordemCrescente;
      this.tarefas = this.ordenarTarefasPorData(this.tarefas, this.deveOrdenarPorData);
    },

    ordenarPorData(){
      this.deveOrdenarPorData = !this.deveOrdenarPorData;
      if(this.deveOrdenarPorData){
        //guarda
        this.tarefasOrganizadas = this.tarefas;
      } else {
        //restaura
        this.tarefas = this.tarefasOrganizadas;
      }
      this.tarefas = this.ordenarTarefasPorData(this.tarefas, this.deveOrdenarPorData);
    },

    ordenarTarefasPorData (tarefas, ordenarPorData = false)
    {
      let novoArrayTarefas = tarefas;

      if(ordenarPorData) {
        let arrayTarefasSemData = [];
        let arrayTarefasComData = [];

        for (let i = 0; i < novoArrayTarefas.length; i++) {
          if(novoArrayTarefas[i].datahora != null && novoArrayTarefas[i].datahora != ''){
            arrayTarefasComData.push(novoArrayTarefas[i]);
          } else {
            arrayTarefasSemData.push(novoArrayTarefas[i]);
          }
        }

        if(this.ordemCrescente) {
          arrayTarefasComData.sort(function(tarefa1,tarefa2){
            return new Date(tarefa1.datahora) - new Date(tarefa2.datahora);
          });
        } else {
          arrayTarefasComData.sort(function(tarefa1,tarefa2){
            return new Date(tarefa2.datahora) - new Date(tarefa1.datahora);
          });
        }

        arrayTarefasComData.push(...arrayTarefasSemData);
        return arrayTarefasComData;
      }

      return novoArrayTarefas;
    },

    tarefasFillDefaults(tarefas)
    {
      for (let i = 0; i < tarefas.length; i++) {
        tarefas[i].meuDiaHoje = false;
        tarefas[i].editMode = false;
        tarefas[i].busyTarefasUpdate = false;
        tarefas[i].showMenuPrioridades = false
        tarefas[i].filtroNaoExibe = false
      }
      return tarefas;
    },

  },
  watch: {
    configuracoes(a, b) {
      // do something
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
    this.loadTarefas();
    this.definicaoFiltroDataPadrao();
  },
}
</script>
