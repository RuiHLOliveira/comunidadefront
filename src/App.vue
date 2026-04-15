<style>

/* gemini deixei de usar */
.titulo-comunidade {
  margin-left: 5px;
  margin-right: 5px;
}
/* gemini deixei de usar */
.img-rui {
  width: 40px;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 5px;
}

/* NOVAS CLASSES GEMINI - IDENTIDADE MODERN SCHOLAR */

.gemini-nav {
  background: #18181e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.gemini-brand-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.gemini-brand-text {
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.2;
  color: #e0e0ff;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.gemini-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(68, 77, 175, 0.5);
}

.gemini-menu-list {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  padding-left: 20px;
}

.gemini-menu-item {
  color: #c7c7c7;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.gemini-menu-item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.gemini-menu-item.router-link-active {
  color: #fff;
  background: rgba(68, 77, 175, 0.15);
}

.gemini-menu-item.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background: #444daf;
  border-radius: 2px;
}

.gemini-logout-btn {
  color: #ff6b6b;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 107, 107, 0.1);
}

.gemini-logout-btn:hover {
  background: rgba(255, 107, 107, 0.1);
  border-color: rgba(255, 107, 107, 0.3);
}

.gemini-mobile-menu-btn {
  background: #444daf;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(68, 77, 175, 0.3);
}

.gemini-main-bg {
  background-color: #18181e;
  background-image: 
    radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.02) 1px, transparent 0),
    radial-gradient(circle at center, rgba(68, 77, 175, 0.03) 0%, transparent 70%);
  background-size: 32px 32px, 100% 100%;
  min-height: 100vh;
  flex-grow: 1;
}

</style>
<template>
  <div id="app">

    <div v-if="appLoaded" >
      
      <div class="menuButton" v-if="isSmallScreen">
        <button type="button" class="gemini-mobile-menu-btn" v-if="loggedIn" @click="toggleMenu()">
          <i v-if="!showMenu" class="fi fi-rs-burger-menu"></i>
          <i v-if="showMenu" class="fi fi-rs-cross"></i>
        </button>
      </div>

      <div class="flex-column">

        <nav class="gemini-nav" v-if="loggedIn && (!isSmallScreen || showMenu)">
          <div class="gemini-brand-section">
            <span class="gemini-brand-text">Comunidade<br>Rui Dev</span>
            <img class="gemini-avatar" src="https://res.cloudinary.com/dbp56iwln/image/upload/v1768669797/foto_perfil_vh0luh.jpg" alt="">
          </div>
          
          <div class="gemini-menu-list">
            <router-link v-if="loggedIn" class="gemini-menu-item" @click="toggleMenu()" to="/posts">
                <span>Posts</span>
            </router-link>
            <router-link v-if="loggedIn" class="gemini-menu-item" @click="toggleMenu()" to="/cursos">
                <span>Cursos</span>
            </router-link>
            <router-link v-if="loggedIn" class="gemini-menu-item" @click="toggleMenu()" to="/perfil">
                <span>Perfil</span>
            </router-link>
            <router-link v-if="loggedIn && isAdmin" class="gemini-menu-item" @click="toggleMenu()" to="/backup">
                Backup
            </router-link>
            <router-link v-if="loggedIn && isAdmin" class="gemini-menu-item" @click="toggleMenu()" to="/invitations">
                Convites
            </router-link>
          </div>
          
          <div>
            <span class="gemini-logout-btn" v-if="loggedIn" @click="logout()">
              Logout
            </span>
          </div>
        </nav>

        <div class="mainPageDiv gemini-main-bg">
          <!-- gemini deixei de usar: class="mainPageDiv mainBackground" -->
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
    isAdmin() {
      return AuthManager.isAdmin()
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
      let requestData = {
        'url': config.serverUrl + '/configuracoes'
      };
      await Request.fetch(requestData)
      .then(( [response, data]) => {
        let configuracoes = this.organizaESeparaConfiguracoes(data)
        this.configuracoes = configuracoes;
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
        // await this.buscaConfiguracoes();
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
