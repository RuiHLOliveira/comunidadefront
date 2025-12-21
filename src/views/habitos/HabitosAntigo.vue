<style scoped>

.marginVerticalSpacer {
  margin-top: 10px;
  margin-bottom: 10px;
}
.whitespace-pre{
  white-space: pre-wrap;
}

.habitosList{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
/* @media only screen and (min-width: 800px) {
  .habitosList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
} */

.cardBoxHabito {
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  background-color: #f1f1f1;
  /* min-width: 90svw; */
  /* min-width: 400px; */
  flex-grow: 1;
  flex-shrink: 0;
}

/* @media only screen and (min-width: 800px) {
  .cardBoxHabito {
    flex:1;
    max-height: 87svh;
    overflow-y: scroll;
    min-width: 350px;
  }
} */


.titleEditInput {
  flex-grow: 1;
  color: red;
}

.monthLine{
  margin: 0px;
  height: 15px;
}
.daySquare {
  font-size: 0.8rem;
  display: inline-block;
  border: 1px solid #757575;
  border-radius: 1px;
  text-align: center;
  /* min-width: 20px; */
  /* max-width: 20px; */
  /* min-height: 20px; */
  /* max-height: 20px; */
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
  margin: 1px;
}
.daySquareGreen {
  background-color: #20c920;
}

.btnPrioridade {
  display: inline;
}

.selected {
  outline: 3px solid #000000;
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
              <router-link class="btn btn-clear" to="/habitTracker">
                  <i class="fi fi-rs-brightness"></i> Voltar para Hábitos
              </router-link>
              <button class="btn mx-5 btn-sm" type="button" @click="toggleModalCriarHabito()">Criar Habito +</button>
            </div>
          </div>
          <div> <!-- right side -->
          </div>
        </div>
        
        <div class="px-15"> <!-- BODY -->
          
          <InlineLoader
            :textoAguarde="true"
            :busy="busyHabitosLoad"
            :center="true">
          </InlineLoader>

          <!--  && busyHabitosLoad == true  -->
          <div v-if="habitos != [] && !busyHabitosLoad" class="habitosList"> <!-- lista de habitos -->
            <div v-for="habito in habitos" :key="habito.id">

              <div class="cardBoxHabito p-5 mb-5">

                <!-- LINE 1 -->
                <div class="flex-wrap justify-spacebetween alignitens-center"> 

                  <!-- common -->
                  <div class="flexGrow1 flex-wrap alignitens-start" v-if="!habito.editMode">

                    <!-- BOTAO CHECK -->
                    <div class="pr-15">
                      <button class="btn btn-checkbox mx-5"  style="font-size: 1.5rem;" 
                        type="button" @click="concluirHabito(habito)"
                        :disabled="habito.busyHabitosConcluir">


                        <i class="fi fi-bs-checkbox" style="color: green;"
                          v-if="habito.realizadoHoje"
                        ></i>

                        <i class="fi fi-bs-square" style="color: #444444;"
                          v-if="!habito.realizadoHoje"
                        ></i>
                      </button>
                    </div>

                    <!-- QUADRINHOS -->
                    <div class="pr-15">
                      <div class="flex-wrap">
                        <span v-for="dia in habito.semana" :key="dia.dia" class="flex-column">
                          <div class="daySquare" :class="{ daySquareGreen : dia.realizado }">
                            {{ dia.weekDayFirstLetter }}
                          </div>
                          <div class="daySquare" :class="{ daySquareGreen : dia.realizado }">
                            {{ dia.dia }}
                          </div>
                        </span>
                      </div>
                    </div>

                    <!-- TITULO E MOTIVO -->
                    <div class="pr-15" style="max-width: 550px;">
                      <div>
                        <span>{{ habito.hora }}</span>
                        <br><span style="font-weight: bold;">{{ habito.descricao }}</span>
                      </div>
                      <div>
                        <span class="my-5 p-5 italicoSutil" v-if="showMotivo[habito.id]">
                          {{ habito.motivo ?? 'sem motivo cadastrado' }}
                        </span>
                      </div>
                    </div>

                  </div>

                  <!-- edicao -->
                  <div class="flexGrow1 flex-column alignitens-start" v-if="habito.editMode"> 
                    <div class="marginVerticalSpacer titleEditInput">
                      <input :disabled="busyHabitosUpdate || habito.busyHabitosConcluir" name="hora" type="time" v-model="habito.horaEditar">
                      <input :disabled="busyHabitosUpdate || habito.busyHabitosConcluir" name="descricao" type="text" v-model="habito.descricaoEditar">
                      <input :disabled="busyHabitosUpdate || habito.busyHabitosConcluir" name="motivo" type="text" v-model="habito.motivoEditar">
                    </div>
                    <div class="marginVerticalSpacer">
                    </div>
                  </div>

                  <!-- right buttons -->
                   
                  <div class="flex-nowrap" v-if="!habito.editMode" style="min-width: 60px;"> 
                    <button class="btn btn-clear btn-sm mr-10" type="button"
                      @click="toggleShowMotivoHabito(habito)">
                      <i class="fi fi-rr-search"></i>
                    </button>
                    <button class="btn btn-clear btn-sm" type="button"
                      :disabled="habito.busyHabitosConcluir"
                      @click="toggleEdicaoHabito(habito)">
                       <i class="fi fi-rs-edit"></i>
                    </button>
                  </div>

                  <div class="flex-column" v-if="habito.editMode"> 

                    <button :disabled="busyHabitosUpdate" v-if="habito.editMode" class="btn mx-5 my-5 btn-sm" type="button" @click="cancelarEdicaoHabito(habito)">Cancelar</button>
                    <button :disabled="busyHabitosUpdate" v-if="habito.editMode" class="btn mx-5 my-5 btn-sm" type="button" @click="salvarEdicaoHabito(habito)">
                      Salvar
                      <InlineLoader :busy="busyHabitosUpdate"></InlineLoader>
                    </button>
                    <button :disabled="busyHabitosUpdate" v-if="habito.editMode" class="btn mx-5 my-5 btn-sm btn-red" type="button" @click="excluirHabito(habito)">Excluir</button>
                  </div>

                </div>

                <!-- LINE 2 -->
                <div class="mt-15 mb-10">
                    <InlineLoader
                      :textoAguarde="true"
                      :busy="habito.busyHabitosConcluir"
                      :center="true">
                    </InlineLoader>
                </div>
                <!-- fim body -->

              </div>

            </div>

          </div>

        </div>

      </div>
      
    </div>

    <Notifier ref="notifier"></Notifier>

    <ModalCriarHabito
      v-model:exibirModal="exibirModalCriarHabito"
      @reloadListaHabitosHabitTracker="buscaHabitos()">
    </ModalCriarHabito>

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
import ModalCriarHabito from '@/views/habitos/ModalCriarHabito.vue';

export default {
  name: 'Habitos',
  components: {
    Loader,
    InlineLoader,
    ModalCriarHabito,
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
      exibirModalCriarHabito: false,
    }
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

    /**
     * FUNCOES TOGGLE
     */
    toggleModalCriarHabito () {
      this.exibirModalCriarHabito = true;
    },

    toggleShowMotivoHabito (habito) {
      this.showMotivo[habito.id] = !this.showMotivo[habito.id];
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
      let params = {
        'relations': 'habitoRealizados',
        'orderBy': 'hora,asc'
      };
      params = QueryStringConverter.toQueryString(params, true);
      let requestData = {
        'url': `${config.serverUrl}/habitos${params}`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        console.log({data});
        this.fillShowMotivo(data)
        data = this.ordenarHabitos(data)
        data = this.defineCamposExtras(data)
        data = this.defineRealizadoHoje(data)
        data = this.fillSemanaRealizados(data)
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

    fillSemanaRealizados(habitos){
      for (let i = 0; i < habitos.length; i++) {
        habitos[i].semana = this.montaSemanaAtual()
        for (let j = 0; j < habitos[i].habitoRealizados.length; j++) {
          // console.log('habito Realizado', habitos[i].habitoRealizados[j])
          const realizadoEmDateObject = this.newDatetimeTz(habitos[i].habitoRealizados[j].realizadoEm);
          const weekDayNumber = this.getWeekDayNumber(realizadoEmDateObject)
          const date = this.getDate(realizadoEmDateObject)
          const month = this.getMonth(realizadoEmDateObject)
          const year = this.getYear(realizadoEmDateObject)
          if(date == habitos[i].semana[weekDayNumber].dia
            && month == habitos[i].semana[weekDayNumber].mes
            && year == habitos[i].semana[weekDayNumber].ano
          ){
            habitos[i].semana[weekDayNumber]['realizado'] = true
          }
          // console.log('depois ', habitos[i].semana[weekDayNumber]);
        }
      }
      return habitos;
    },
    
    updateHabito(habito) {
      console.log(habito.id);
      this.busyHabitosUpdate = true;
      let body = {
        'descricao': habito.descricao,
        'motivo': habito.motivo,
        'hora': habito.hora,
        'prioridade': habito.prioridade,
        'situacao': habito.situacao,
      };

      let requestData = {
        'url': `${config.serverUrl}/habitos/${habito.id}`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        
        'method' : 'PUT',
        'data' : body
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyHabitosUpdate = false;
        // this.resetFields(true)
        this.$refs.notifier.notify('Habito salvo!')
        this.toggleEdicaoHabito(habito)
        this.buscaHabitos();
      }).catch((error) => {
        console.error(error);
        this.busyHabitosUpdate = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
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

    montaSemanaAPartirDomingo(dateDomingo)
    {
      const oneDayTimestamp = 24 * 60 * 60 * 1000
      let dia = dateDomingo
      let semana = [];
      let qtd = 7;
      for (let i = 0; i < qtd; i++) {
        if(i > 0) {
          dia.setTime(dia.getTime() + (oneDayTimestamp)); // sums 1 day
        }
        semana.push({
          dateObject: new Date(dia.getTime()),
          dia: this.getDate(new Date(dia.getTime())),
          mes: this.getMonth(new Date(dia.getTime())),
          ano: this.getYear(new Date(dia.getTime())),
          weekDay: this.getWeekDay(new Date(dia.getTime())),
          weekDayFirstLetter: this.getWeekDayFirstLetter(new Date(dia.getTime())),
          realizado: false
        })
      }
      return semana;
    },
    montaSemanaAtual() {
      const oneDayTimestamp = 24 * 60 * 60 * 1000
      let hoje = new Date()
      // console.log('hoje', hoje.getDay(), hoje.getDate());
      let domingo = new Date(hoje.getTime() - (hoje.getDay() * oneDayTimestamp)); //returns to sunday
      // console.log('domingo', domingo.getDay(), domingo.getDate());
      let semana = this.montaSemanaAPartirDomingo(domingo);
      // console.log(semana);
      this.semana = semana
      return semana;
    },

  },
  watch: {
    configuracoes(a, b) {
      // do something
    }
  },
  created () {
    // this.montaSemanaAtual();
    this.buscaHabitos();
  },
}
</script>
