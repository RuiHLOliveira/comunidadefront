<style>
section.login {
  min-width: 400px;
  max-width: 400px;
  /* min-height: 400px; */
  /* max-height: 400px; */
  margin: inherit auto;
  /* padding: 10px; */
  /* margin-top: 20px; */
  border-radius: 5px;
  border: 1px solid var(--darkmode-border-gray);
}
</style>

<template>
      <div class="container flex alignitens-center justify-center">

        <section class="login mt-15 px-15 py-30 px-30">
          <div class="textCenter mb-20">
            <h1 >Login</h1>
          </div>

          <div>
            <label for="email">Email:</label>
            <input :disabled="busy" name="email" type="email" placeholder="email" id="email" v-model="email">
          </div>

          <div class="mt-15">
            <label for="password">Senha:</label>
            <input :disabled="busy" name="password" type="password" placeholder="senha" id="senha" v-model="password">
          </div>

          <div class="mt-10 flex-column">
            <button class="btn mt-20 mb-30" :disabled="busy" @click="login()" id="button-entrar">Entrar</button>
            <router-link :disabled="busy" class="btn" id="router-link-register" to="/register">Register</router-link>
          </div>
          
          <div class="mt-30 mb-10">
            <InlineLoader
              :textoAguarde="true"
              :busy="busy"
              :center="true">
            </InlineLoader>
          </div>

        </section>
      </div>
      
      <Notifier ref="notifier"></Notifier>
</template>

<script>
import InlineLoader from '@/components/InlineLoader.vue';
import AuthManager from '@/core/AuthManager.js';
import config from '@/core/config.js'
import Request from '@/core/request.js'
import Notifier from '@/components/Notifier.vue'

export default {
  name: 'Login',
  components: {
    InlineLoader,
    Notifier
  },
  data: () => {
    return {
      busy: false,
      email: '',
      password: '',
    }
  },
  emits: ['redirectAfterLogin'],
  methods: {
    // notify(message, type = 'success'){
    //     this.showNotify = true;
    //     this.notifyMessage = message;
    // },
    login () {
      this.busy = true;
      let url = config.serverUrl + '/auth/login';
      let body = {
        'email': this.email,
        'password': this.password
      };
      let requestData = {
        'url': url,
        method: 'POST',
        data: body,
        notAuthenticated: true
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        console.log('data',data);
        this.$refs.notifier.notify('Logado! Redirecionando...')
        AuthManager.storeToken(data.token);
        AuthManager.storeRefreshToken(data.refreshToken);
        this.busy = false;
        this.$emit('redirectAfterLogin', [])
      })
      .catch((error) => {
        console.error(error);
        this.busy = false;
        let message = error;
        console.info('[LOG] erro...', message);
        if(error == 'Failed to fetch' || error == null || error == '') {
          console.info('[LOG] mensagem padrão...');
          message = 'Falha no login.';
        }
        console.info('[LOG] mensagem...', message);
        this.$refs.notifier.notify('Ocorreu um erro: ' + message, true)
      });
    },
  },
  watch: {
  },
  mounted () {
    if(AuthManager.isLoggedIn()) {
      this.$emit('redirectAfterLogin', [])
    }
  },
  destroyed() {
  }
}
</script>
