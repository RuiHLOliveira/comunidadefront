
<style>
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

@media only screen and (min-width: 800px) {
  .modalNotify {
    margin-top: 20px;
    margin-right: 20px;
  }
}

.modalNotify-error {
  background-color: #e78f8f;
}

</style>

<template>
  <div>
    <div v-if="showNotify || debugShow" class="fix" :class="{ modalNotifyContainer : modalMode == true }">
      <div class="shadow-3" :class="{ modalNotify : modalMode == true, 'modalNotify-error' : error == true }">
        {{ !debugShow ? message : debugMessage }}
      </div>
    </div>
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

