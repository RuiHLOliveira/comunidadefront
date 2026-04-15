<style>
/* gemini classe era inline */
.modern-scholar-register-container {
  min-height: 100vh;
  background-color: #18181e;
  background-image: 
    radial-gradient(circle at center, rgba(44, 44, 57, 0.4) 0%, transparent 70%),
    radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 100% 100%, 24px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-scholar-register-card {
  min-width: 400px;
  max-width: 400px;
  padding: 40px;
  background-color: #262631;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  border: none;
}

/* Barra lateral fina de acento */
.modern-scholar-register-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #3b3b4f;
}

.modern-scholar-input {
  width: 100%;
}
</style>

<template>
  <div class="modern-scholar-register-container">
    <section class="modern-scholar-register-card">
      <div class="mb-20">
        <h1 class="modern-scholar-title">Register</h1>
      </div>
      
      <div class="modern-scholar-group">
        <label class="modern-scholar-label" for="invitationToken">Palavra Passe:</label>
        <input class="modern-scholar-input" :disabled="busy" name="invitationToken" type="text" placeholder="invitationToken" v-model="invitationToken">
      </div>
      
      <div class="modern-scholar-group">
        <label class="modern-scholar-label" for="email">Email:</label>
        <input class="modern-scholar-input" :disabled="busy" name="email" type="email" placeholder="email" v-model="email">
      </div>
      
      <div class="modern-scholar-group">
        <label class="modern-scholar-label" for="password">Senha:</label>
        <input class="modern-scholar-input" :disabled="busy" name="password" type="password" placeholder="senha" v-model="password">
      </div>
      
      <div class="modern-scholar-group">
        <label class="modern-scholar-label" for="repeatPassword">Repita a senha:</label>
        <input class="modern-scholar-input" :disabled="busy" name="repeatPassword" type="password" placeholder="repeatPassword" v-model="repeatPassword">
      </div>
      
      <div class="modern-scholar-actions">
        <button class="modern-scholar-btn-primary" :disabled="busy" @click="register()">Criar conta</button>
        <router-link :disabled="busy" class="modern-scholar-btn-secondary" to="/">Login</router-link>
      </div>
      
      <div class="mt-30 mb-10">
        <InlineLoader
          :textoAguarde="true"
          :busy="busy"
          :center="true">
        </InlineLoader>
      </div>
    </section>

    <Notifier ref="notifier"></Notifier>
  </div>
</template>

<script>
import AuthManager from '@/core/AuthManager.js';
import config from '@/core/config.js'
import Request from '@/core/request.js'
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';

export default {
  name: 'Register',
  components: {
    InlineLoader,
    Notifier
  },
  data: () => {
    return {
      busy: false,
      email: '',
      password: '',
      invitationToken: '',
      repeatPassword: '',
    }
  },
  methods: {
    // notify(message, type = 'success'){
    //     this.showNotify = true;
    //     this.notifyMessage = message;
    // },
    register () {
      this.busy = true;
      let url = config.serverUrl + '/auth/register';
      let body = {
        'email': this.email,
        'password': this.password,
        'invitationToken': this.invitationToken,
        'repeatPassword': this.repeatPassword
      };
      let data = {
        method: 'POST',
        body: JSON.stringify(body),
      };

      let requestData = {
        'url': url,
        method: 'POST',
        data: body,
        notAuthenticated: true
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        this.$refs.notifier.notify('Registrado! Faça o login.') //this.notify('Registrado! Faça o login.');
        this.busy = false;
      })
      .catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) // this.notify('Ocorreu um erro: ' + error);
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
  created () {
  },
  destroyed() {
  }
}
</script>
