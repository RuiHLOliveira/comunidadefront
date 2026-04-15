<style>
/* section.login { gemini deixei de usar */
section.login-old {
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

/* Identidade Modern Scholar */

.modern-scholar-login-container {
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

.modern-scholar-login-card {
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
.modern-scholar-login-card::before {
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

/* gemini novas classes identidade Modern Scholar para login com código */
.modern-scholar-btn-toggle-mode {
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.02);
  color: #a0a0b0;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.modern-scholar-btn-toggle-mode:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.1);
}

.modern-scholar-btn-request-code {
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: #a0a0b0;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.modern-scholar-btn-request-code:hover:not(:disabled) {
  background-color: rgba(59, 59, 79, 0.1);
  border-color: #3b3b4f;
  color: #fff;
}

.modern-scholar-btn-request-code:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-style: solid;
}
</style>

<template>
      <div class="modern-scholar-login-container /* gemini deixei de usar container flex alignitens-center justify-center */">

        <section class="modern-scholar-login-card /* gemini deixei de usar login mt-15 px-15 py-30 px-30 */">
          <div class="mb-20 /* gemini deixei de usar textCenter */">
            <h1 class="modern-scholar-title">Login</h1>
          </div>

          <div class="modern-scholar-group">
            <label class="modern-scholar-label" for="email">Email:</label>
            <input class="modern-scholar-input" :disabled="busy" name="email" type="email" placeholder="email" id="email" v-model="email">
          </div>

          <div v-if="!showAuthFields" class="modern-scholar-actions">
            <button class="modern-scholar-btn-primary" :disabled="busy || !email" @click="startPasswordLogin()">Entrar com senha</button>
            <button class="modern-scholar-btn-secondary" :disabled="busy || !email" @click="startCodeLogin()">Entrar com código por e-mail</button>
            <router-link :disabled="busy" class="modern-scholar-btn-secondary" id="router-link-register" to="/register">Criar Conta</router-link>
          </div>

          <div v-else>
            <div class="modern-scholar-group">
              <label class="modern-scholar-label" for="password">{{ useCode ? 'Código:' : 'Senha:' }}</label>
              <input class="modern-scholar-input" :disabled="busy" name="password" :type="useCode ? 'text' : 'password'" :placeholder="useCode ? 'código' : 'senha'" id="senha" v-model="password">
            </div>

            <div v-if="useCode" class="mt-10">
              <button class="modern-scholar-btn-request-code" :disabled="busy || codeCooldown > 0" @click="requestCode()">
                {{ codeCooldown > 0 ? `Aguarde ${codeCooldown}s` : 'Solicitar código novamente' }}
              </button>
            </div>

            <div class="modern-scholar-actions">
              <button class="modern-scholar-btn-primary" :disabled="busy" @click="login()" id="button-entrar">Entrar</button>
              <button class="modern-scholar-btn-secondary" :disabled="busy" @click="showAuthFields = false">Voltar</button>
            </div>
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
      useCode: false,
      showAuthFields: false,
      codeCooldown: 0,
      cooldownInterval: null
    }
  },
  emits: ['redirectAfterLogin'],
  methods: {
    // notify(message, type = 'success'){
    //     this.showNotify = true;
    //     this.notifyMessage = message;
    // },
    startPasswordLogin() {
      if (!this.email) {
        this.$refs.notifier.notify('Informe seu email primeiro.', true);
        return;
      }
      this.useCode = false;
      this.showAuthFields = true;
    },
    startCodeLogin() {
      if (!this.email) {
        this.$refs.notifier.notify('Informe seu email primeiro.', true);
        return;
      }
      this.useCode = true;
      this.showAuthFields = true;
      this.requestCode();
    },
    startCooldown() {
      this.codeCooldown = 60;
      if (this.cooldownInterval) clearInterval(this.cooldownInterval);
      this.cooldownInterval = setInterval(() => {
        this.codeCooldown--;
        if (this.codeCooldown <= 0) {
          clearInterval(this.cooldownInterval);
        }
      }, 1000);
    },
    requestCode() {
      if (!this.email) {
        this.$refs.notifier.notify('Informe seu email para receber o código.', true);
        this.showAuthFields = false;
        return;
      }
      if (this.codeCooldown > 0) return;

      this.busy = true;
      let url = config.serverUrl + '/auth/request-code';
      let body = {
        'email': this.email
      };
      let requestData = {
        'url': url,
        method: 'POST',
        data: body,
        notAuthenticated: true
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        this.$refs.notifier.notify('Código enviado para seu e-mail!');
        this.busy = false;
        this.startCooldown();
      })
      .catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Erro ao solicitar código: ' + error, true);
        // Em caso de erro, não iniciamos o cooldown para permitir tentar novamente
      });
    },
    login () {
      this.busy = true;
      let url = config.serverUrl + '/auth/login';
      let body = {
        'email': this.email,
      };

      if (this.useCode) {
        body.code = this.password;
      } else {
        body.password = this.password;
      }

      let requestData = {
        'url': url,
        method: 'POST',
        data: body,
        notAuthenticated: true
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        this.$refs.notifier.notify('Logado! Redirecionando...')
        AuthManager.storeAuthData(data);
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
    if (this.cooldownInterval) clearInterval(this.cooldownInterval);
  }
}
</script>
