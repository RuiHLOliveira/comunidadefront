
<style>
/* gemini deixei de usar */
.modalNotifyContainer {
  /* position: absolute; */
  position: fixed;
  top: 0;
  right: 0;
  /* width: 50vw; */
  /* height: 100vh; */
  /* background: #0000008f; */
  display: flex;
  justify-content: center;
  align-items: top;
  z-index: 99;
}

/* gemini deixei de usar */
.modalNotify {
  border: 2px solid #00000070;
  margin-top: 40px;
  margin-right: 20px;
  background-color: #29bb55;
  background-color: #67cc85;
  background-color: #8fe7a9;
  border-radius: 3px;
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: top;
  width: 300px;
  /* min-width: 300px; */
  /* height: 50px; */
  z-index: 99;
}

/* gemini deixei de usar */
.modalNotify-error {
  background-color: #e78f8f;
}

/* NOVAS CLASSES GEMINI - IDENTIDADE MODERN SCHOLAR */

.gemini-notifier-wrapper {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  pointer-events: none;
}

.gemini-toast {
  background: rgba(38, 38, 49, 0.9); /* #262631 com opacidade */
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px 24px;
  width: 320px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  color: #fff;
  font-weight: 600;
  pointer-events: auto;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.gemini-toast::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #42b42b; /* Sucesso default */
}

.gemini-toast-error::before {
  background: #ff6b6b; /* Erro */
}

/* Transições */
.gemini-toast-enter-active, .gemini-toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.gemini-toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.gemini-toast-leave-to {
  transform: translateX(50%);
  opacity: 0;
}

</style>

<template>
  <div class="gemini-notifier-wrapper">
    <transition name="gemini-toast">
      <div v-if="showNotify || debugShow" 
           class="gemini-toast" 
           :class="{ 'gemini-toast-error' : error == true }">
        {{ !debugShow ? message : debugMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      debugShow: false,
      modalMode: true,
      debugMessage: 'Mensagem de debugging',
      message: '',
      showNotify: false,
      error: false
    }
  },
  // emits: ['update:showNotify'],
  props: {
    // showNotify: Boolean,
    // message: String
  },
  methods:{
    notify(message, error = false){
      this.message = message
      this.error = error
      this.showNotify = true
      setTimeout(() => {
        this.showNotify = false
      }, 3000);
    },
  },
  expose: ['notify'],
  watch: {
    // showNotify (newValue, oldValue) {
    //   if(newValue === true) {
    //     setTimeout(() => {
    //       this.$emit('update:showNotify', false)
    //       console.log('emitted');
    //     }, 3000);
    //   }
    // }
  },
}
</script>

