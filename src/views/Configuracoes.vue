<style>
</style>

<template>
  <div>
    <div class="container">

      <h1>Configuracoes</h1>

      <section class="flex-lateral-button">
        <button class="btn btn-sm" type="button" @click="criarConfiguracaoPadrao()">Criar configuração padrão</button>
      </section>

      <section v-if="configuracoes['exibir_dia_semana_habit_tracker']">
        <label for="conf"> {{ configuracoes['exibir_dia_semana_habit_tracker'].chave }} {{ configuracoes['exibir_dia_semana_habit_tracker'].valor }}</label>
        <input type="text" v-model="configuracoes['exibir_dia_semana_habit_tracker'].valor">
        <button type="button" @click="atualizarConfiguracao(configuracoes['exibir_dia_semana_habit_tracker'])">Salvar</button>
      </section>
    </div>

    <Notifier ref="notifier"></Notifier>
    <Loader :busy="busy"></Loader>

  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';
import Notifier from '@/components/Notifier.vue';
import Request from '@/core/request.js';
import config from '@/core/config.js'
import QueryStringConverter from '@/core/QueryStringConverter.js'

export default {
  name: 'HabitTracker',
  components: {
    Loader,
    Notifier
  },
  data: () => {
    return {
      busy: false,
      dataCompleta: '',
      configuracoes: [],
      exibirCriarConfiguracao: false,
      formChave: '',
      formValor: '',
    }
  },
  methods: {
    toggleCriarConfiguracao(){
      this.exibirCriarConfiguracao = !this.exibirCriarConfiguracao
    },
    resetFields(){
        this.formChave = '';
        this.formValor = '';
    },
    criarConfiguracaoPadrao(){
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + '/configuracoes/criarPadrao',
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data' : {}
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.busy = false;
        this.$refs.notifier.notify('Configuracao padrão criada!')
        this.buscaConfiguracoes();
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },
    atualizarConfiguracao(configuracao) {
      this.busy = true;
      let body = {
        'chave': configuracao.chave,
        'valor': configuracao.valor,
      };
      let requestData = {
        'url': config.serverUrl + '/configuracoes/' + configuracao.id,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.busy = false;
        this.$refs.notifier.notify('Configuracao salva!')
        this.buscaConfiguracoes();
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },
    buscaConfiguracoes () {
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + '/configuracoes'
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        let configuracoes = this.organizaESeparaConfiguracoes(data)
        this.configuracoes = configuracoes;
        this.busy = false;
      })
      .catch((error) => {
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
        console.error(error);
      });
    },
    organizaESeparaConfiguracoes(lista){
      let novaLista = [];
      for (let i = 0; i < lista.length; i++){
        let conf = lista[i];
        //verificar se a conf existe na lista permitida
        //colocar em lista separada por nome
        novaLista[conf.chave] = conf;
      }
      return novaLista
    },
  },
  watch: {
  },
  created () {
    this.buscaConfiguracoes();
  },
}
</script>
