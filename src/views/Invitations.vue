<style scoped>
.scholar-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  border-left: 5px solid #4a4a6a;
  padding-left: 15px;
}

.scholar-card {
  background-color: #262631;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s;
}

.scholar-card:hover {
  background-color: #2c2c39;
}

.scholar-margin-y {
  margin-top: 25px;
  margin-bottom: 25px;
}

.scholar-padding {
  padding: 30px;
}

.scholar-subtitle {
  font-size: 1.4rem;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.scholar-subtitle::before {
  content: '';
  width: 4px;
  height: 20px;
  background: #4a4a6a;
  margin-right: 12px;
  border-radius: 2px;
}

.scholar-label {
  display: block;
  margin-bottom: 8px;
  color: #aaa;
  font-size: 0.9rem;
}

.scholar-input {
  width: 100%;
  padding: 12px;
  background-color: #18181e;
  border: 1px solid #3b3b4f;
  border-radius: 8px;
  color: white;
  margin-bottom: 10px;
  outline: none;
}

.scholar-input:focus {
  border-color: #4a4a6a;
}

.scholar-btn {
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.scholar-btn-primary {
  background-color: #4a4a6a;
  color: white;
}

.scholar-btn-primary:hover {
  background-color: #5a5a7a;
}

.scholar-mt-10 {
  margin-top: 10px;
}

.scholar-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scholar-list-item {
  background-color: #1e1e26;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 3px solid transparent;
  transition: border-color 0.2s;
}

.scholar-list-item:hover {
  border-left-color: #4a4a6a;
}

.scholar-token {
  font-family: monospace;
  color: #fff;
  font-size: 1.1rem;
}

.scholar-status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  background: rgba(255, 0, 0, 0.1);
  color: #ff6b6b;
}

.scholar-status.status-active {
  background: rgba(0, 255, 100, 0.1);
  color: #51cf66;
}

.scholar-email {
  color: #888;
  font-size: 0.9rem;
}
</style>

<template>
  <div>
    <div class="container">

      <h1 class="scholar-title scholar-margin-y">Convites</h1>

      <!-- gemini deixei de usar: section (implicit) -->
      <section class="scholar-card scholar-margin-y scholar-padding">
        <h2 class="scholar-subtitle">Criar Convite</h2>
        <div class="scholar-form-group">
          <label for="newInvitationToken" class="scholar-label">newInvitationToken:</label>
          <input name="newInvitationToken" type="text" placeholder="nome" v-model="newInvitationToken" class="scholar-input">
          <!-- gemini deixei de usar: button (implicit) -->
          <button @click="criarConvite()" class="scholar-btn scholar-btn-primary scholar-mt-10">
            Criar newInvitationToken
          </button>
        </div>
      </section>

      <!-- gemini deixei de usar: section (implicit) -->
      <section class="scholar-card scholar-margin-y scholar-padding">
        <h2 class="scholar-subtitle">Lista de Convites</h2>
        <div class="scholar-list">
          <!-- gemini deixei de usar: div v-for (implicit styling) -->
          <div v-for="invitation in invitations" :key="invitation.id" class="scholar-list-item">
            <span class="scholar-token">{{ invitation.invitationToken }}</span>
            <span class="scholar-status" :class="{'status-active': invitation.active}">{{ invitation.active ? 'Ativo' : 'Inativo' }}</span>
            <span class="scholar-email">{{ invitation.email || 'Sem e-mail' }}</span>
          </div>
        </div>
      </section>
    </div>

    <Loader :busy="busy"></Loader>
    <Notifier ref="notifier"></Notifier>
    <!-- <Notifier v-model:showNotify="showNotify" :message="notifyMessage"></Notifier> -->
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';
import Request from '@/core/request.js';
import config from '@/core/config.js'
import Notifier from '@/components/Notifier.vue';

export default {
  name: 'ListaConvites',
  components: {
    Loader,
    Notifier
  },
  data: () => {
    return {
      busy: false,
      newInvitationToken: '',
      email: '',
      invitations: [],
      // showNotify: false,
      // notifyMessage: '',
    }
  },
  methods: {
    // notify(message, type = 'success'){
    //     this.showNotify = true;
    //     this.notifyMessage = message;
    // },
    buscaConvites () {
      this.busy = true;
      let requestData = {
        'url': config.serverUrl + '/invitations',
      };

      Request.fetch(requestData)
      .then(([response, data]) => {
        this.invitations = data
        this.busy = false;
      })
      .catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) // this.notify('Ocorreu um erro.' + error);
      });
    },
    criarConvite() {
      this.busy = true;
      let body = {
        'newInvitationToken': this.newInvitationToken,
        'email': this.email
      };
      let requestData = {
        'url': config.serverUrl + '/invitations',
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'post',
        'data' : body
      };
      Request.fetch(requestData).then(([response, data]) => {
        this.$refs.notifier.notify('Convite criado!') //this.notify('Convite criado!');
        this.busy = false;
        this.buscaConvites();
      }).catch((error) => {
        console.error(error);
        this.busy = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify('Ocorreu um erro.' + error);
      });
    },
  },
  watch: {
  },
  created () {
    this.buscaConvites();
  },
  destroyed() {
  }
}
</script>
