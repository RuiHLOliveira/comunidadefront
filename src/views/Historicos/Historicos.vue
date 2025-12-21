<style>
.historico {
  padding: 10px;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 10px;
  margin-top: 20px;
}
.historicoProjeto {
  border: 2px solid rgb(31, 102, 194);
}

.historicoTarefa {
  border: 2px solid rgb(211, 211, 88);
}

.historicoHabito {
  border: 2px solid rgb(37, 177, 37);
}

</style>

<template>
  <div>
    <div class="container">

      <section class="mt-10">
        <div class="">
          <h1 class="">Historicos</h1>
        </div>
      </section>

      <section class="flex-column">

        <InlineLoader
          :textoAguarde="true"
          :busy="busy || busyHabitosLoad"
          :center="true">
        </InlineLoader>

        <div v-if="historicos != [] && !busy">
          <div v-for="historico in historicos" :key="historico.id">

            <!-- PROJETO -->
            <div v-if="historico.moduloTipo == 1" class="historico historicoProjeto flex-column">
              <div>{{ historico.createdAtReadable }} - {{ historico.descricao }}</div>
              <div>Modulo id: {{ historico.moduloId }}</div>
            </div>

            <!-- TAREFA -->
            <div v-if="historico.moduloTipo == 2" class="historico historicoTarefa flex-column">
              <div>{{ historico.createdAtReadable }} - {{ historico.descricao }}</div>
              <div>Modulo id: {{ historico.moduloId }}</div>
            </div>

            <!-- HABITO -->
            <div v-if="historico.moduloTipo == 3" class="historico historicoHabito flex-column">
              <div class="font-weight-bold">{{ historico.createdAtReadable }} - {{ historico.descricao }} - {{ historico.entidade.descricao }}</div>
              <div>Texto: {{ historico.texto }}</div>
            </div>

          </div>
        </div>

      </section>

    <Notifier ref="notifier"></Notifier>

    </div>
  </div>
</template>

<script setup>
import DateTime from '@/core/DateTime.js'
import Request from '@/core/request.js';
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js'
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import { HistoricosStorage } from '@/core/storage/HistoricosStorage.js'
import { HabitosStorage } from '@/core/storage/HabitosStorage.js'

import { ref, onMounted, onUnmounted } from 'vue';

onMounted( () => {
    window.addEventListener('resize', getDimensions());
    getDimensions()
    loadHistoricos();
});

onUnmounted( () => {
    window.removeEventListener('resize', getDimensions());
});

const notifier = ref();
const busy = ref(false);
const busyHabitosLoad = ref(false);
// const dataPrazo: '',
const historicos = ref([]);
const habitos = ref([]);
// const tarefasBackup: [],
// const exibirModalCriarTarefa: false,
// const exibirModalEditarTarefa: false,
// const tarefaModalEditarTarefa: [],
// const projetoModalEditarTarefa: [],
// const carregarPreviamenteAsTarefas: true,
// const filtroPrioridade: null,
// const filtroSituacao: null,
// const nextProgramedListingAmount: 0,
// const showMotivo: [],
const windowWidth =  ref(0);
const windowHeight =  ref(0);
// const selectedPrioridade: 0,
// const selectedSituacao: 1
  // computed: {
  //   isSmallScreen() {
  //     console.log(this.windowWidth);
  //     console.log(this.windowWidth < 800);
  //     return this.windowWidth < 800
  //   },
  // },

function getDimensions () {
  windowWidth.value = document.documentElement.clientWidth;
  windowHeight.value = document.documentElement.clientHeight;
}

function notify(text, error = false){
  notifier.value.notify(text,error)
}

function loadHistoricos () {
  busy.value = true;
  // const params = {'orderBy': 'created_at, desc', 'properties' : 'projeto'};
  const promiseHitoricos = HistoricosStorage.index();
  const promiseHabitos = HabitosStorage.index();
  Promise.all([promiseHitoricos,promiseHabitos])
  .then((data) => {
    let resHistoricos = data[0][1]
    let resHabitos = data[1][1]
    historicos.value = processHistoricos(resHistoricos, resHabitos)
    console.log('[historicos] ',historicos.value)
    busy.value = false;
  })
  .catch((error) => {
    busy.value = false;
    console.error(error);
    notify(`Ocorreu um erro: ${error}`, true)
  });
}

function processHistoricos(historicos, habitos){
  const mapHabitos = new Map();
  habitos.forEach(habito => {
    mapHabitos.set(habito.id,habito);
  });
  historicos.forEach(historico => {
    historico['createdAtReadable'] = DateTime.formatBrDateTime(new Date(historico.createdAt.date));
    historico['entidade'] = null;
    if(historico.moduloTipo == 3) historico['entidade'] = mapHabitos.get(historico.moduloId)
  })
  return historicos;
}

</script>
