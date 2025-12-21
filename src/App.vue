<template>
  <div id="app">

    <div v-if="appLoaded" >
      
      <div class="menuButton" v-if="isSmallScreen">
        <button type="button" class="btn shadow-2" v-if="loggedIn" @click="toggleMenu()">
          <i v-if="!showMenu" class="fi fi-rs-burger-menu"></i>
          <i v-if="showMenu" class="fi fi-rs-cross"></i>
        </button>
      </div>

      <div class="flex">

        <nav class="leftNav shadow-1" v-if="loggedIn && (!isSmallScreen || showMenu)">
          <span class="leftNavTitle my-15">Comunidade<br>Rui Dev</span>
          <span class="leftNavText my-15">Olá, usuario!</span>
          <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/posts">
              <!-- <i class="fi fi-rs-journal-alt"></i> -->
              <span>Posts</span>
          </router-link>
          <!-- <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/tarefas">
              <i class="fi fi-rs-list-check"></i> Tarefas
          </router-link>
          <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/historicos">
              <i class="fi fi-rs-list-check"></i> Historicos
          </router-link>
          <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/habitTracker">
              <i class="fi fi-rs-brightness"></i> Habit Tracker
          </router-link>
          <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/habitTrackerMensal">
              <i class="fi fi-rs-brightness"></i> habitTrackerMensal
          </router-link>
          <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/inspiracao">
            <i class="fi fi-sr-circle-1"></i> Inspiração
          </router-link> -->
          <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/backup">
              <i class="fi fi-rs-disk"></i> Backup
          </router-link>
          <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/invitations">
              <i class="fi fi-rs-file-user"></i> Convites
          </router-link>
          <!-- <router-link v-if="loggedIn" class="menuItem" @click="toggleMenu()" to="/configuracoes">
              <i class="fi fi-rs-gears"></i> Configurações
          </router-link> -->
          <span class="menuItem" v-if="loggedIn" @click="logout()"><i class="fi fi-rs-sign-out-alt"></i> Logout</span>
        </nav>

        <div class="mainPageDiv mainBackground">
          <div :class="{ 'displayNone' : showMenu }">
            <router-view
              @redirectAfterLogin="redirectAfterLogin()"
            />
          </div>
        </div>
        
      </div>
    </div>
    <Loader :busy="busy"></Loader>
    <Notifier ref="notifier"></Notifier>
  </div>
</template>

<style>
@import url('@/assets/main.css');
</style>

<script>
import AuthManager from '@/core/AuthManager.js';
import Request from '@/core/request.js';
import config from '@/core/config.js'
import Loader from '@/components/Loader.vue';
import Notifier from '@/components/Notifier.vue';
import { computed } from 'vue'

export default {
  name: "App",
  components: {
    Loader,
    Notifier,
  },
  provide() {
    return {
      configuracoes: computed(() => this.configuracoes)
    }
  },
  data: function () {
    return {
      busy: false,
      loggedIn: AuthManager.isLoggedIn(),
      configuracoesArray: [],
      configuracoes: {},
      appLoaded: false,
      showMenu: false,
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
    toggleMenu() {
      if(this.isSmallScreen) {
        this.showMenu = !this.showMenu;
      } else {
        this.showMenu = false;
      }
    },

    getDimensions() {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
    },

    updateLoggedIn(){
      this.loggedIn = AuthManager.isLoggedIn();
    },
    
    redirectAfterLogin(){
      this.updateLoggedIn()
      this.$router.push({ path: '/posts' })
    },

    logout() {
      AuthManager.logout();
      this.$refs.notifier.notify('Sessão encerrada.')
      this.updateLoggedIn()
      console.log('redirecting');
      this.$router.push({ path: '/' })
    },

    async buscaConfiguracoes () {
      console.log('[LOG] Carregando configuracoes');
      let requestData = {
        'url': config.serverUrl + '/configuracoes'
      };
      await Request.fetch(requestData)
      .then(( [response, data]) => {
        let configuracoes = this.organizaESeparaConfiguracoes(data)
        this.configuracoes = configuracoes;
        console.log('[LOG] Configuracoes carregadas', this.configuracoes);
      })
      .catch((error) => {
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

    async loadConfiguracoesSeLogado(){
      if(this.loggedIn){
        await this.buscaConfiguracoes();
      }
    },

    async loadApp(){
      this.busy = true
      this.appLoaded = true
      this.busy = false
    }

  },
  watch: {
    loggedIn (a, b){
      this.loadConfiguracoesSeLogado();
    }
  },
  beforeCreate(){
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions);
    this.getDimensions()
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions);
  },
  async created () {
    this.loadApp();
  },
};
</script>
