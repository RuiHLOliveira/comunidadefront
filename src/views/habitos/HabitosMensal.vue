<style scoped>

.boxHabito{
  background-color: #252525;
  padding: 10px 5px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

@media only screen and (min-width: 800px) {
  .boxHabito{
    width: 400px;
    max-width: 400px;
  }
}

.boxMes {
  padding: 10px;
  margin: 10px;
  background-color: #252525;
  border-radius: 10px;
  overflow-x: scroll;
}

.squareDay{
  border: 1px solid white;
  padding: 2px;
  margin: 5px;
}

</style>

<template>
  <div>
    <div class="container">

      <div class="darkmodeBgBlack"> <!-- HABITOS -->
        
        <div class="flex justify-spacebetween py-5 px-15"> <!-- TITLE -->
          <div class="flex justify-spacebetween alignitens-center"> <!-- left side -->
            <div class="mr-10">
              <h1>Habitos</h1>
            </div>
            <div>
              <button class="mx-5 btn btn-sm btn-clear" type="button" @click="toggleModalCriarEditarHabito()">Criar Habito +</button>
            </div>
          </div>
          <div class="flex justify-spacebetween alignitens-center">
            <!-- right side -->
            <button type="button" class="mx-5 btn btn-sm btn-clear" @click="toggleHabitosControl()">
              <i class="fi fi-rs-brightness"></i> Editar Habitos
            </button>
          </div>
        </div>
        
        <div class="px-15"> <!-- BODY -->
          
          <InlineLoader
            :textoAguarde="true"
            :busy="busyHabitosLoad"
            :center="true">
          </InlineLoader>

          <!-- lista de habitos -->
          <div v-if="habitos != [] && !busyHabitosLoad" :class="isSmallScreen ? 'flex-column' :  'flex-wrap'">
            <div v-for="habito in habitos" :key="habito.id">

              <!-- linha 1 -->
              <div class="mb-5">

                <!-- descricao do habito -->
                <div class="boxHabito">

                  <div class="flex-column">

                    <div class="flex justify-spacebetween">
                      <div>
                        <button class="btn btn-checkbox mx-5" style="position: relative; top: 3px;" 
                          type="button" @click="toggleModalConcluirHabito(habito)"
                          :disabled="habito.busyHabitosConcluir"
                          v-if="!habito.busyHabitosConcluir">
                          <i class="fi fi-bs-checkbox" style="color: green;" v-if="habito.realizadoHoje"></i>
                          <i class="fi fi-bs-square" style="color: #444444;" v-if="!habito.realizadoHoje"></i>
                        </button>
                        <span class="mx-10 font-weight-bold">{{ habito.hora }}</span>
                        <span>{{ habito.descricao }}</span>
                      </div>
                      <div>
                        <button class="btn btn-clear btn-sm ml-20" type="button"
                          v-if="habitosControl"
                          @click="toggleModalCriarEditarHabito(habito)">
                          <i class="fi fi-rs-edit"></i>
                        </button>
                      </div>
                    </div>

                    <!-- <div class="mt-10">
                    </div> -->
                    
                    <div v-if="showMotivo[habito.id]">
                      <span class="my-5 p-5 italicoSutil" >
                        {{ habito.motivo ?? 'sem motivo cadastrado' }}
                      </span>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        <div>

          <div v-for="ano in listaAnos" :key="ano.ano">
            {{ ano.ano }}
            <div class="flex-column">
              <div v-for="mes in ano.meses" :key="mes.mes">
                {{ mes.nomeMes }}
                <div class="boxMes flex">
                  <div v-for="dia in mes.dias" :key="dia.dia" class="squareDay">
                    {{ dia.dia }} {{ dia.diaSemanaExtenso }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

      </div>
      
    </div>

    <Notifier ref="notifier"></Notifier>

    <ModalCriarEditarHabito
      v-model:exibirModal="exibirModalCriarEditarHabito"
      v-model:habito="habitoModalEditar"
      @reloadListaHabitosHabitTracker="buscaHabitos()">
    </ModalCriarEditarHabito>
    
    <ModalCompletarHabito
      v-model:exibirModal="exibirModalCompletarHabito"
      v-model:habitoCompletar="habitoCompletar"
      @reloadListaHabitosHabitTracker="buscaHabitos()">
    </ModalCompletarHabito>

  </div>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import { HabitosStorage } from '@/core/storage/HabitosStorage.js'
import Request from '@/core/request.js';
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js'
import Loader from '@/components/Loader.vue';
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import ModalCriarEditarHabito from '@/views/habitos/ModalCriarEditarHabito.vue';
import ModalCompletarHabito from './ModalCompletarHabito.vue';
import geradorDeMes from '../../core/geradorDeMes.js';

export default {
  name: 'Habitos',
  components: {
    Loader,
    InlineLoader,
    ModalCriarEditarHabito,
    ModalCompletarHabito,
    Notifier,
  },
  inject: ['configuracoes'],
  data: () => {
    return {
      busy: false,
      // busyHabitosLoad: false,
      busyHabitosLoad: false,
      busyHabitosUpdate: false,
      // dataPrazo: '',
      meses: [],
      semana: [],
      habitos: [],
      showMotivo: [],
      exibirModalCriarEditarHabito: false,
      exibirModalCompletarHabito: false,
      habitoCompletar: [],
      habitoModalEditar: [],
      referenciaAnos: [
        2020, 2021, 2022, 2023, 2024, 2025
      ],
      referenciaMeses: [1,2,3,4,5,6,7,8,9,10,11,12],
      referenciaMesesExtenso: ['semnome','Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      listaAnos: [],
      
      windowWidth: 0,
      windowHeight: 0,

      habitosControl: false,

    }
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth < 800
    },
  },
  methods: {
    
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

    /**
     * FUNCOES TOGGLE
     */

    toggleModalConcluirHabito(habitoCompletar) {
      this.exibirModalCompletarHabito = !this.exibirModalCompletarHabito
      if(this.exibirModalCompletarHabito) {
        console.info("abrindo modal", this.habitoCompletar)
        this.habitoCompletar = habitoCompletar;
      } else {
        this.habitoCompletar = [];
        console.info("fechando modal", this.habitoCompletar)
      }
    },

    toggleModalCriarEditarHabito(habito = null) {
      this.habitoModalEditar = []
      if(habito != null) {
        this.habitoModalEditar = habito
      }
      this.exibirModalCriarEditarHabito = true;
    },

    toggleShowMotivoHabito (habito) {
      this.showMotivo[habito.id] = !this.showMotivo[habito.id];
    },

    toggleHabitosControl() {
      this.habitosControl = !this.habitosControl;
    },

    /**
     * EDIT FORMS
     */
    toggleEdicaoHabito(habito) {
      if(habito.editMode == undefined) habito.editMode = false;
      if(habito.descricaoEditar == undefined) habito.descricaoEditar = habito.descricao;
      if(habito.motivoEditar == undefined) habito.motivoEditar = habito.motivo;
      if(habito.horaEditar == undefined) habito.horaEditar = habito.hora;
      habito.prioridadeEditar = habito.prioridade;
      habito.situacaoEditar = habito.situacao;
      habito.editMode = !habito.editMode
    },
    cancelarEdicaoHabito(habito) {
      this.toggleEdicaoHabito(habito)
      habito.descricaoEditar = habito.descricao;
      habito.motivoEditar = habito.motivo;
      habito.horaEditar = habito.hora;
    },
    salvarEdicaoHabito(habito) {
      console.log(habito.nomeEditar)
      console.log(habito.anotacoesEditar)
      habito.descricao = habito.descricaoEditar
      habito.motivo = habito.motivoEditar
      habito.hora = habito.horaEditar
      habito.prioridade = habito.prioridadeEditar
      habito.situacao = habito.situacaoEditar
      console.log(habito);
      this.updateHabito(habito);
    },
    toggleEditarSituacao(habito, novaSituacao){
      habito.situacaoEditar = novaSituacao;
    },
    toggleEditarPrioridade(habito, novaPrioridade){
      habito.prioridadeEditar = novaPrioridade;
    },

    excluirHabito(habito) {
      // ask for confirmation
      if(!confirm("Deseja apagar o habito?")){
        return;
      }
      console.log(habito.id);
      this.busy = true;
      let requestData = {
        'url': `${config.serverUrl}/habitos/${habito.id}`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'DELETE',
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busy = false;
        this.$refs.notifier.notify('Habito excluído!')
        this.toggleEdicaoHabito(habito)
        this.buscaHabitos();
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },

    /**
     * FUNCOES FETCH API
     */
    buscaHabitos () {
      this.busyHabitosLoad = true;
      HabitosStorage.index()
      .then(([response, data]) => {
        console.log({data});
        this.fillShowMotivo(data)
        data = this.ordenarHabitos(data)
        data = this.defineCamposExtras(data)
        data = this.defineRealizadoHoje(data)
        this.habitos = data
        this.busyHabitosLoad = false;
      })
      .catch((error) => {
        this.busyHabitosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    fillShowMotivo(habitos)
    {
      for (let i = 0; i < habitos.length; i++) {
        this.showMotivo[habitos[i].id] = false;
      }
    },

    ordenarHabitos(habitos){
      habitos = habitos.sort((a,b) => {
        return a.hora > b.hora
      })
      return habitos
    },
    
    defineCamposExtras(habitos){
      for (let i = 0; i < habitos.length; i++) {
        habitos[i].busyHabitosConcluir = false;
      }
      return habitos;
    },

    defineRealizadoHoje(habitos){
      for (let i = 0; i < habitos.length; i++) {
        habitos[i].realizadoHoje = false;
        for (let j = 0; j < habitos[i].habitoRealizados.length; j++) {
          const dataRealizadoEm = this.formatDevDate(this.newDatetimeTz(habitos[i].habitoRealizados[j].realizadoEm));
          const dataHoje = this.formatDevDate(new Date());
          if( dataRealizadoEm == dataHoje ){
            habitos[i].realizadoHoje = true;
          }
        }
      }
      return habitos;
    },

    concluirHabito(habito) {
      if(habito.realizadoHoje == true) return;
      console.log(habito.id);
      habito.busyHabitosConcluir = true;
      let body = {};

      let requestData = {
        'url': `${config.serverUrl}/habitos/${habito.id}/concluir`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data' : body
      };
      return Request.fetch(requestData).then(([response, data]) => {
        habito.busyHabitosConcluir = false;
        this.$refs.notifier.notify('Habito concluído!')
        // this.toggleEdicaoHabito(habito)
        this.buscaHabitos();
      }).catch((error) => {
        console.error(error);
        habito.busyHabitosConcluir = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },

    geraCalendario(){
      let listaAnos = [];
      this.referenciaAnos.forEach(anoCorrente => {
        let mesesGerados = [];
        this.referenciaMeses.forEach(mesCorrente => {
          let mesGerado = geradorDeMes.geradorDeMes(mesCorrente,anoCorrente);
          mesesGerados.push({'mes': mesCorrente, 'dias': mesGerado, 'nomeMes': this.referenciaMesesExtenso[mesCorrente]});
          console.log(mesCorrente, mesGerado);
        })
        console.log(mesesGerados);
        listaAnos.push({'ano': anoCorrente, 'meses': mesesGerados});
      });
      console.log(listaAnos);
      this.listaAnos = listaAnos;
    },
  },
  watch: {
    configuracoes(a, b) {
      // do something
    }
  },
  created () {
    this.geraCalendario();
    this.buscaHabitos();
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions);
    this.getDimensions()
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions);
  },

}
</script>
