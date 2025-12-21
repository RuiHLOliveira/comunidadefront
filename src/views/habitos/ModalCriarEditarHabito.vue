<style>
</style>

<template>
<Teleport to="body">
  <div v-if="exibirModal">
    <div class="modalBackground">
      <div class="modal">
        <h1 v-if="habitoLocal.id != null">Hábito - Editar</h1>
        <h1 v-else>Hábito - Criar</h1>

        <label for="descricao">descricao:</label>
        <input name="descricao" :disabled="busy" type="text" placeholder="descricao" v-model="habitoLocal.descricao">

        <label for="motivo">motivo:</label>
        <input name="motivo" :disabled="busy" type="text" placeholder="motivo" v-model="habitoLocal.motivo">
        
        <label for="hora">Hora:</label>
        <input name="hora" :disabled="busy" type="time" placeholder="hora" v-model="habitoLocal.hora">

        <button :disabled="busy" class="btn btn-wider btn-red" @click="fecharModal()">
          Fechar
        </button>
        <button :disabled="busy" class="btn btn-wider" @click="criarEditarHabito()">
          Salvar
          <InlineLoader :busy="busy"></InlineLoader>
        </button>

      </div>
    </div>
    <Notifier ref="notifier"></Notifier>
  </div>
</Teleport>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import deepCopy from '@/core/deepcopy.js';
import Loader from '@/components/Loader.vue';
import Request from '@/core/request.js';
import config from '@/core/config.js'
import Notifier from '@/components/Notifier.vue';
import InlineLoader from '@/components/InlineLoader.vue';
import { HabitosStorage } from '@/core/storage/HabitosStorage.js'

export default {
  components: {
    Loader,
    InlineLoader,
    Notifier
  },
  data: function () {
    return {
      busy: false,
      needReload: false,
      habitoLocal: {},
      // showNotify: false,
      // notifyMessage: '',
    }
  },
  emits: ['reloadListaHabitosHabitTracker'],
  props: {
    exibirModal: Boolean,
    habito: Object,
  },
  methods: {
    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},

    // notify(message, type = 'success'){
    //     this.showNotify = true;
    //     this.notifyMessage = message;
    // },
    fillHabitoLocalDefaultValues() {
      this.resetFields()
    },

    resetFields(needReload = false){
        this.needReload = needReload;
        this.habitoLocal.descricao = '';
        this.habitoLocal.motivo = '';
        this.habitoLocal.hora = '';
    },
    fecharModal() {
      this.$emit('update:exibirModal', false)
      if(this.needReload == true) {
        console.log('reload');
        this.$emit('reloadListaHabitosHabitTracker', [])
        this.resetFields();
      }
    },
    criarEditarHabito() {
      if (this.habitoLocal.id != null) {
        return this.editarHabito();
      }
      return this.criarHabito();
    },

    editarHabito() {
      this.busy = true;
      HabitosStorage.editar(this.habitoLocal)
      .then(([response, data]) => {
        this.$refs.notifier.notify('Habito editado!')
        this.busy = false;
        this.needReload = true;
        //this.resetFields(true);
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },
    criarHabito() {
      this.busy = true;
      HabitosStorage.criar(this.habitoLocal)
      .then(([response, data]) => {
        this.$refs.notifier.notify('Habito criado!')
        this.busy = false;
        this.needReload = true;
        this.resetFields(true);
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
    habito(newProp, oldProp) {
      this.habitoLocal = deepCopy.deepCopy(newProp);
      console.log(this.habitoLocal);
      if(this.habitoLocal.id == null) {
        this.fillHabitoLocalDefaultValues();
      }
    }
  }
}
</script>

