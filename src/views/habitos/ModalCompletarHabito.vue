<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal-extra-small">

        <div class="flex-column">
          <section class="mb-10">
            <h1 class="textCenter mb-10">Completar Habito</h1>
            <div class="mt-10">{{ habitoCompletar.descricao }}</div>
          </section>

          <section v-if="habitoCompletar.situacao == 0">
            <label for="texto">texto:</label>
            <input :disabled="busy" name="texto" type="text" placeholder="texto" v-model="textoObservacao">
          </section>

          <section v-else>
            <div class="textCenter mb-10">Habito já finalizado.</div>
          </section>

          <section class="mt-10">
            <button class="btn btn-wider btn-clear"
              :disabled="busy" @click="fecharModal()">
              Fechar
            </button>
            <button class="btn btn-clear iconBig"
                v-if="habitoCompletar.situacao == 0"
                :disabled="busy" @click="concluirHabito()">
                <i class="fi fi-br-checkbox"></i> Concluir
            </button>
          </section>
        </div>

        <InlineLoader :busy="busy"></InlineLoader>
      </div>
    </div>

    <Notifier ref="notifier"></Notifier>
  </div>
</Teleport>
</template>

<script setup>
import DateTime from '@/core/DateTime.js'
import deepCopy from '@/core/deepcopy.js';
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import Request from '@/core/request.js'
import config from '@/core/config.js'

import { ref, watch, watchEffect } from 'vue';
import { HabitosStorage } from '../../core/storage/HabitosStorage';

const notifier = ref();
const busy = ref(false);
const needReload = ref(false);
// const habitoCompletar = ref([]);
const habitoFoiCompletado = ref(false)
const textoObservacao = ref('')
const localHabitoCompletar = ref([]);

const props = defineProps({
  exibirModal: Boolean,
  habitoCompletar: Object
});

const emit = defineEmits([
  'reloadListaHabitosHabitTracker',
  'update:exibirModal',
  'update:habitoCompletar',
]);

watch(() => props.habitoCompletar, (novo, antigo) => {
  localHabitoCompletar.value = deepCopy.deepCopy(novo);
  // FUNCIONA
});
watch(() => props.exibirModal, (novo, antigo) => {
  // FUNCIONA
});

function notify(text, error = false){
  notifier.value.notify(text,error)
}

function fecharModal() {
  emit('update:exibirModal', false)
  if(needReload.value == true) {
    console.log('reload');
    emit('reloadListaHabitosHabitTracker');
    needReload.value = false;
  }
  if(habitoFoiCompletado.value == true) {
    console.info('habito completado');
    emit('habitoCompletar', props.habitoCompletar);
    habitoFoiCompletado.value = false
  }
}

function concluirHabito() {
  if(props.habitoCompletar.realizadoHoje == true) return;
  busy.value = true;
  HabitosStorage.concluir(props.habitoCompletar, textoObservacao.value)
  .then(([response, data]) => {
    busy.value = false;
    needReload.value = true;
    habitoFoiCompletado.value = true;
    props.habitoCompletar.situacao = 1;
    notify('Habito concluído!')
  }).catch((error) => {
    console.error(error);
    busy.value = false;
    notify(`Ocorreu um erro: ${error}`, true)
  });
}
</script>

