<style>
section.register {
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
  <div class="">
    <div class="">
      <div class="container flex alignitens-center justify-center">

        <section class="register mt-15 px-15 py-30 px-30">
          <div class="textCenter mb-20">
            <h1>Register</h1>
          </div>
          
          <div>
            <label for="invitationToken">Palavra Passe:</label>
            <input :disabled="busy" name="invitationToken" type="text" placeholder="invitationToken" v-model="invitationToken">
          </div>
          
          <div>
            <label for="email">Email:</label>
            <input :disabled="busy" name="email" type="email" placeholder="email" v-model="email">
          </div>
          
          <div>
            <label for="password">Senha:</label>
            <input :disabled="busy" name="password" type="password" placeholder="senha" v-model="password">
          </div>
          
          <div>
            <label for="repeatPassword">Repita a senha:</label>
            <input :disabled="busy" name="repeatPassword" type="password" placeholder="repeatPassword" v-model="repeatPassword">
          </div>
          
          <div class="mt-10 flex-column">
            <button class="btn mt-20 mb-30" :disabled="busy" @click="register()">Criar conta</button>
            <router-link :disabled="busy" class="btn" to="/">Login</router-link>
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
    </div>
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
        console.log('data',data);
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
