<style scoped>

/* .inlineLoaderContainer {
  font-size: 1rem;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  background: #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: center;
} */

.inlineLoaderContainerTexto {
  /* margin: 0 auto; */
  /* padding: 10px; */
  font-size: 1rem;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  background: var(--darkmode-bg-color);
  color: var(--darkmode-font-color);
  border: 1px solid var(--gray-button-border);
  /* border: 1px solid; */
  /* border-color: #f1f1f1; */
  /* display: inline-block; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.inlineLoader {
  padding: 0px;
  display: inline-block;
  vertical-align: middle;
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #42b42b; /* Blue */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 2s linear infinite;
}

.textoAguarde {
  display:inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<template>
    <span v-if="busy" :class="{ xcenter : center }">
      <span v-if="busy" :class="{ inlineLoaderContainerTexto : textoAguarde }">
        <span class="mr-10" v-if="textoAguarde">
          Aguarde...
        </span>
        <div class="inlineLoader"></div>
      </span>
    </span>
</template>

<script>
export default {
  data: function () {
    return {
      ini: ''
    }
  },
  props: {
    busy: Boolean,
    textoAguarde: Boolean,
    center: Boolean
  }
}
</script>

